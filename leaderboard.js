const SQLite = require("better-sqlite3");
const traders = new SQLite('./db/traders.sqlite')
const portfolios = new SQLite('./db/portfolios.sqlite');
const leaderboard = new SQLite('./db/leaderboard.sqlite');
const SMFunctions = require('./stockMarketFunctions.js');
const request = require('request');
const fs = require('fs');
var alexaColor = "#31C4F3";


setInterval(async () => {
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
                            if (portfolio[c]) {
                                const fakeMessage = {
                                    author: {
                                        id: 1
                                    }
                                }
                                await SMFunctions.getPrice(portfolio[c].symbol, fakeMessage);
                                //console.log(portfolio)
                                newPortfolioValue = newPortfolioValue + (SMFunctions.stockPrice[fakeMessage.author.id].price.last * portfolio[c].qty);
                            } else {return;}
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
}, 120000);

setInterval(async () => {
    async function updateCurrentPlayers() {
        let numOfTraders = traders.prepare("SELECT COUNT(userId) FROM traders;").get();
        numOfTraders = numOfTraders["COUNT(userId)"];

        request({
            method: 'POST',
            uri: 'http://www.alexadiscord.com:8080',
            body: {"stockPlayers": numOfTraders},
            json: true
        })
        let startTime = new Date();
        console.log(`${startTime.toLocaleTimeString('en-us',{timeZone:'America/New_York'})}: STOCK MARKET PLAYER COUNT POST SENT`)
    }

    await updateCurrentPlayers();

    async function updateFeatureTracker() {
        let featureTrackerRaw = fs.readFileSync('./featureTrackerLog.json');
        let featureTracker = JSON.parse(featureTrackerRaw);
        request({
            method: 'POST',
            uri: 'http://www.alexadiscord.com:8080',
            body: featureTracker,
            json: true
        })
        let startTime = new Date();
        console.log(`${startTime.toLocaleTimeString('en-us',{timeZone:'America/New_York'})}: FEATURE TRACKER POST SENT`)
    }

    await updateFeatureTracker();
}, 30000);