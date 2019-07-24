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

let i = 20;
async function apiLimiter() {
  setTimeout(() => {
    axios.get(`https://cloud.iexapis.com/stable/stock/${symbolList[i].symbol}/splits`, {
        params: {
          token: config.iexCloudKey
        }
      })
      .then(response => {
        console.log("Checking for splits on " + symbolList[i].symbol);
        console.log(response.data);
        if (response.data[0]) {
          if (response.data[0].exDate != finalDate) {
            const userList = portfolios.prepare("SELECT * FROM portfolios WHERE symbol = ?").all(symbolList[i].symbol);
            userList.forEach((user) => {
              user.qty = user.qty / response.data[0].ratio;
              portfolios.prepare("UPDATE portfolios SET qty = ? WHERE userId = ? AND symbol = ?").run(user.qty, user.userId, user.symbol);
              console.log(`Stock split applied to ${user.userId} for ${user.symbol} at a ratio of 1:${response.data[0].ratio}`);

              stocksLog.log({
                level: 'info',
                guildName: null,
                username: user.userId,
                eventName: 'Shares split',
                stockSymbol: user.symbol,
                quantity: user.qty,
                sharePrice: null
              })
            })
          }
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

        i++;

        if (i < symbolList.length) {
          apiLimiter();
        }
      })
  }, 250)
}

apiLimiter();