const SQLite = require("better-sqlite3");
const traders = new SQLite('./db/traders.sqlite')
const portfolios = new SQLite('./db/portfolios.sqlite');
const leaderboard = new SQLite('./db/leaderboard.sqlite');
const SMFunctions = require('./stockMarketFunctions.js');
var alexaColor = "#31C4F3";


setInterval(() => {
    let startTime = new Date();
    console.log(`${startTime.toLocaleTimeString('en-us',{timeZone:'America/New_York'})}: LEADERBOARD UPDATE JOB STARTING`)
    async function assignLeaderboard() {
        let tradersArray = traders.prepare("SELECT * FROM traders;").all();
        async function forEachTrader(array) {
            for (b = 0; b < array.length; b++) {
                let portfolio = portfolios.prepare("SELECT * FROM portfolios WHERE userId = ?").all(tradersArray[b].userId);
                if (portfolio) {
                    let newPortfolioValue = 0;

                    async function forEachPortfolio(portfolioArray) {
                        for (c = 0; c < portfolioArray.length; c++) {
                            await SMFunctions.getPrice(portfolio[c].symbol);
                            //console.log(tradersArray[b].userId + " portfolio")
                            newPortfolioValue = newPortfolioValue + (SMFunctions.stockPrice.price.last * portfolio[c].qty);
                        }
                    }

                    await forEachPortfolio(portfolio);
                    newPortfolioValue = newPortfolioValue + tradersArray[b].money;
                    leaderboard.prepare("INSERT OR REPLACE INTO leaderboard (userId, username, portfolioValue) VALUES (@userId, @username, @portfolioValue)").run({userId: tradersArray[b].userId, username: tradersArray[b].username, portfolioValue: newPortfolioValue})
                } else {return;}
            }
        }
        await forEachTrader(tradersArray);
        let endTime = new Date();
        console.log(`${endTime.toLocaleTimeString('en-us',{timeZone:'America/New_York'})}: LEADERBOARD UPDATE JOB DONE`);
    }

    assignLeaderboard();
}, 15000)