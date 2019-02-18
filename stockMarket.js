const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const traders = new SQLite('./traders.sqlite')
const portfolios = new SQLite('./portfolios.sqlite');
const algotrader = require('algotrader');
const SMFunctions = require('./stockMarketFunctions.js');
const Yahoo = algotrader.Data.Yahoo;
const Query = algotrader.Data.Query;
const IEX = algotrader.Data.IEX;

const StockMarket = {
    create: async function(message) {
        let newProfile = new Discord.RichEmbed();
        const checkExisting = traders.prepare("SELECT * FROM traders WHERE userId = ?").get(message.author.id);
        if (!checkExisting) {
            traders.prepare("INSERT OR REPLACE INTO traders (userId, money) VALUES (@userId, @money)").run({userId: message.author.id, money: 50000})
            newProfile
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTitle("Wallet:")
                .setDescription("$50,000")
                .addField("Portfolio:","You haven't purchased any stock yet!")
                .setFooter("Your profile has been created!")
            
            message.channel.send(newProfile)
        } else {message.channel.send("You already have a stock market profile set up!")}

    },

    viewPortfolio: async function(message) {
        let portfolio = portfolios.prepare("SELECT * FROM portfolios WHERE userId = ?").all(message.author.id);
        let money = traders.prepare("SELECT money FROM traders WHERE userId = ?").get(message.author.id).money;
        let portfolioDescription = "";
        let portfolioValue = 0;
        let portfolioEmbed = new Discord.RichEmbed();
        console.log(money)
        console.log(portfolio);
        //console.log(portfolio);

        if (money) {
            if (portfolio[0]) {
                async function forEach(array) {
                    for (let i = 0; i < array.length; i++) {
                        await SMFunctions.getPrice(portfolio[i].symbol, message);
                        let profitEach = (SMFunctions.stockPrice.price.close - portfolio[i].purchasePrice).toFixed(2);
                        let profitTotal = ((SMFunctions.stockPrice.price.close * portfolio[i].qty) - (portfolio[i].purchasePrice * portfolio[i].qty)).toFixed(2);
                        let profitPercent = (profitEach / portfolio[i].purchasePrice * 100).toFixed(2);
                        portfolioValue = portfolioValue + (SMFunctions.stockPrice.price.close * portfolio[i].qty);
                        portfolioDescription = portfolioDescription + `**${portfolio[i].companyName}** (${portfolio[i].symbol}): ${portfolio[i].qty} shares purchased at \$${portfolio[i].purchasePrice.toFixed(2)} each \n Current price: \$${SMFunctions.stockPrice.price.close.toFixed(2)} | **\$${profitTotal}** total profit (${profitPercent}%) \n`;
                        console.log(portfolioDescription)
                    }
                }

                async function embed() {
                    await forEach(portfolio);
                    portfolioEmbed
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle("Wallet:")
                        .setDescription(`\$${money.toLocaleString('en-us',{timeZone:'America/New_York'})}`)
                        .addField("Portfolio value:", `\$${portfolioValue.toLocaleString('en-us',{timeZone:'America/New_York'})}`)
                        .addField("Portfolio:", portfolioDescription)

                    message.channel.send(portfolioEmbed)
                }
                embed();
            } else {
                portfolioEmbed
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setTitle("Wallet:")
                    .setDescription(`\$${money.toLocaleString('en-us',{timeZone:'America/New_York'})}`)
                    .addField("Portfolio:", "You haven't purchased any stock yet!")
            
                message.channel.send(portfolioEmbed)
            }
        } else {
            message.channel.send("You haven't created a stock market profile yet! Try `Alexa stocks start` to create one.")
        }
    },

    add: async function(message) {
        let symbol = message.content.slice(17);
        let msgArray = symbol.split(" ");
        let profile = traders.prepare("SELECT * FROM traders WHERE userId = ?").get(message.author.id);
        let portfolio = portfolios.prepare("SELECT * FROM portfolios WHERE userId = ?").get(message.author.id);
        
        let newPortfolio = {
            userId: message.author.id,
            symbol: msgArray[0].toUpperCase(),
            companyName: msgArray[1],
            qty: parseInt(msgArray[2]),
            purchasePrice: parseInt(msgArray[3])
        }
        console.log(newPortfolio)
        portfolios.prepare("INSERT OR REPLACE INTO portfolios (userId, symbol, companyName, qty, purchasePrice) VALUES (@userId, @symbol, @companyName, @qty, @purchasePrice)").run(newPortfolio);
        portfolios.prepare("SELECT * FROM portfolios WHERE userId = ?").all(message.author.id)
    },

    test: async function(message) {
        let symbol = message.content.slice(18)
        await SMFunctions.getHistory(symbol, message);
        console.log(SMFunctions.stockHistory);
    },

    search: async function(message) {
        let searchQuery = message.content.slice(20);
        let searchEmbed = new Discord.RichEmbed();
        await SMFunctions.getSearch(searchQuery, message);
        await SMFunctions.getLogo(SMFunctions.companySearch.symbol);
        searchEmbed
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(SMFunctions.companySearch.name)
            .setThumbnail(SMFunctions.companyLogo)
            .setURL(`https://finance.yahoo.com/quote/${SMFunctions.companySearch.symbol}`)
            .setDescription(`Symbol: **${SMFunctions.companySearch.symbol}**`)
            .setFooter(`Exchange: ${SMFunctions.companySearch.exchDisp}`)

        message.channel.send(searchEmbed)
    },

    getHistory: async function(message) {
        let symbol = message.content.slice(21).toUpperCase();
        let historyEmbed = new Discord.RichEmbed();
        await SMFunctions.getLogo(symbol, message);
        await SMFunctions.getHistory(symbol, message);
        historyEmbed
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${SMFunctions.stockHistory.companyName} (${SMFunctions.stockHistory.symbol})`)
            .setThumbnail(SMFunctions.companyLogo)
            .setURL(`https://finance.yahoo.com/quote/${symbol}`)
            .setDescription(`
                52 week high: **\$${SMFunctions.stockHistory.week52high.toFixed(2)}**
                52 week low: **\$${SMFunctions.stockHistory.week52low.toFixed(2)}**
                52 week change: **\$${SMFunctions.stockHistory.week52change.toFixed(2)}**
                5-year change: **${Number(SMFunctions.stockHistory.year5ChangePercent * 100).toFixed(2)}%**
                2-year change: **${Number(SMFunctions.stockHistory.year2ChangePercent * 100).toFixed(2)}%**
                1-year change: **${Number(SMFunctions.stockHistory.year1ChangePercent * 100).toFixed(2)}%**
                YTD change: **${Number(SMFunctions.stockHistory.ytdChangePercent * 100).toFixed(2)}%**
                6-month change: **${Number(SMFunctions.stockHistory.month6ChangePercent.toFixed(2) * 100).toFixed(2)}%**
                3-month change: **${Number(SMFunctions.stockHistory.month3ChangePercent.toFixed(2) * 100).toFixed(2)}%**
                1-month change: **${Number(SMFunctions.stockHistory.month1ChangePercent.toFixed(2) * 100).toFixed(2)}%**
            `)

        message.channel.send(historyEmbed)
    },

    getPrice: async function(message) {
        let symbol = message.content.slice(19).toUpperCase();
        let getPriceEmbed = new Discord.RichEmbed();
        await SMFunctions.getLogo(symbol, message);
        await SMFunctions.getCompanyName(symbol, message);
        await SMFunctions.getPrice(symbol, message);
        getPriceEmbed
            .setAuthor(message.author.username, message.author.avatarURL, "")
            .setTitle(`${SMFunctions.companyName} (${symbol})`)
            .setThumbnail(`${SMFunctions.companyLogo}`)
            .setURL(`https://finance.yahoo.com/quote/${symbol}`)
            .setDescription(`**\$${SMFunctions.stockPrice.price.close.toFixed(2)}**`)
            .setFooter(`as of ${SMFunctions.stockPrice.date.toLocaleString('en-us',{timeZone:'America/New_York'})} EST`)

        message.channel.send(getPriceEmbed);
    }
}
module.exports = StockMarket;