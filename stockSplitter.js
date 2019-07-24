const config = require('./config.json');
const axios = require('axios');
const winston = require('winston');
const SQLite = require("better-sqlite3");
const portfolios = new SQLite('./db/portfolios.sqlite');

const stocksLog = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/alexaStocks.log'
    })
  ]
})

const newDate = new Date();
const dateOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
};
const dateString = newDate.toLocaleDateString('en-US', dateOptions);
const dateArray = dateString.split("/");
const finalDate = dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];

const symbolList = portfolios.prepare("SELECT symbol FROM portfolios GROUP BY symbol").all();

let i = 0;
async function apiLimiter() {
  setTimeout(() => {
    axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'TIME_SERIES_DAILY_ADJUSTED',
          symbol: symbolList[i].symbol,
          apikey: config.alphaVantageKey
        }
      })
      .then(response => {
        console.log("Checking for splits on " + symbolList[i].symbol);
        if (response.data['Time Series (Daily)'] && response.data['Time Series (Daily)'][finalDate]) {
          console.log(response.data['Time Series (Daily)'][finalDate]);
          const splitMultiplier = parseFloat(response.data['Time Series (Daily)'][finalDate]['8. split coefficient']);
          if (splitMultiplier != 1) {
            const userList = portfolios.prepare("SELECT * FROM portfolios WHERE symbol = ?").all(symbolList[i].symbol);
            userList.forEach((user) => {
              user.qty = user.qty * splitMultiplier;
              if (user.splitDate != finalDate) {
                portfolios.prepare("UPDATE portfolios SET qty = ? AND splitDate = ? WHERE userId = ?").run(user.qty, finalDate, user.userId);
                console.log(`Stock split applied to ${user.userId} for ${user.symbol} at a multiplier of ${splitMultiplier}`);
  
                stocksLog.log({
                  level: 'info',
                  guildName: null,
                  username: user.userId,
                  eventName: 'Shares split',
                  stockSymbol: user.symbol,
                  quantity: user.qty,
                  sharePrice: null
                })
              }
            })
          }
        } else {
          console.log(`Date did not exist for ${symbolList[i].symbol}`)
        }
        
      })
      .then(() => {
        i++;

        if (i < symbolList.length) {
          apiLimiter();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, 15000)
}

apiLimiter();