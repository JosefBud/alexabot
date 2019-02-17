const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const algotrader = require('algotrader');
const Yahoo = algotrader.Data.Yahoo;
const Query = algotrader.Data.Query;
const IEX = algotrader.Data.IEX;

const StockMarket = {
    search: function(message) {
        let searchQuery = message.content.slice(20);
        let searchEmbed = new Discord.RichEmbed();

        Query.search(searchQuery)
            .then(queryResult => {
                if (queryResult[0]) {
                    let searchResult = queryResult[0]
                    async function getSymbol() {
                        symbol = searchResult.symbol;
                        return;
                    }
                    getSymbol();

                    async function waitSymbol() {
                        await getSymbol();
                        IEX.getLogo(symbol)
                            .then(logoResult => {
                                async function getCompanyLogo() {
                                    companyLogo = logoResult;
                                    return;
                                }

                                async function sendEmbed() {
                                    await getCompanyLogo();
                                    searchEmbed
                                        .setAuthor(message.author.username, message.author.avatarURL)
                                        .setTitle(searchResult.name)
                                        .setThumbnail(companyLogo)
                                        .setURL(`https://finance.yahoo.com/quote/${searchResult.symbol}`)
                                        .setDescription(`Symbol: **${searchResult.symbol}**`)
                                        .setFooter(`Exchange: ${searchResult.exchDisp}`)
            
                                    message.channel.send(searchEmbed)
                                }
            
                                sendEmbed();
                            })
                            .catch(error => {
                                console.log(error)
                                message.channel.send("Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message and try again!");
                            })
                    }

                    waitSymbol();
                } else {message.channel.send("There are no results!")}
            })
            .catch(error => {
                console.log(error)
                message.channel.send("Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message and try again!");
            })
    },

    getHistory: function(message) {
        let symbol = message.content.slice(21).toUpperCase();
        let historyEmbed = new Discord.RichEmbed();
        //console.log(symbol);
        IEX.getLogo(symbol)
            .then(logoResult => {
                async function getCompanyLogo() {
                    companyLogo = logoResult;
                    return;
                }
                
                IEX.getStats(symbol)
                    .then(statsResult => {
                        async function waitCompanyLogo() {
                            await getCompanyLogo();
                            historyEmbed
                                .setAuthor(message.author.username, message.author.avatarURL)
                                .setTitle(`${statsResult.companyName} (${statsResult.symbol})`)
                                .setThumbnail(companyLogo)
                                .setURL(`https://finance.yahoo.com/quote/${symbol}`)
                                .setDescription(`
                                    52 week high: **\$${statsResult.week52high.toFixed(2)}**
                                    52 week low: **\$${statsResult.week52low.toFixed(2)}**
                                    52 week change: **\$${statsResult.week52change.toFixed(2)}**
                                    5-year change: **${Number(statsResult.year5ChangePercent * 100).toFixed(2)}%**
                                    2-year change: **${Number(statsResult.year2ChangePercent * 100).toFixed(2)}%**
                                    1-year change: **${Number(statsResult.year1ChangePercent * 100).toFixed(2)}%**
                                    YTD change: **${Number(statsResult.ytdChangePercent * 100).toFixed(2)}%**
                                    6-month change: **${Number(statsResult.month6ChangePercent.toFixed(2) * 100).toFixed(2)}%**
                                    3-month change: **${Number(statsResult.month3ChangePercent.toFixed(2) * 100).toFixed(2)}%**
                                    1-month change: **${Number(statsResult.month1ChangePercent.toFixed(2) * 100).toFixed(2)}%**
                                `)

                            message.channel.send(historyEmbed)
                        }
                        //console.log(statsResult)
                        waitCompanyLogo();
        
                    })
                    .catch(error => {
                        console.log(error);
                        message.channel.send("Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message and try again!");
                    })

                getCompanyLogo();
            })
            .catch(error => {
                console.log(error);
                message.channel.send("Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message and try again!");
            })

    },

    getPrice: function(message) {
        let symbol = message.content.slice(19).toUpperCase();
        
        IEX.getLogo(symbol)
                .then(logoResult => {
                    async function getCompanyLogo() {
                        companyLogo = logoResult;
                        //console.log(companyLogo);
                        return;
                    }

                    Query.search(symbol)
                        .then(queryResult => {
                            async function getCompanyName() {
                                companyName = queryResult[0].name;
                                return;
                            }

                            async function waitCompanyName() {
                                await getCompanyName();
                                await getCompanyLogo();
                                Yahoo.getQuotes(symbol,"1m","1m",true)
                                    .then(quoteResult => {
                                        let latestPrice = quoteResult.pop();

                                        let getPriceEmbed = new Discord.RichEmbed();
                                        getPriceEmbed
                                            .setAuthor(message.author.username, message.author.avatarURL, "")
                                            .setTitle(`${companyName} (${symbol})`)
                                            .setThumbnail(`${companyLogo}`)
                                            .setURL(`https://finance.yahoo.com/quote/${symbol}`)
                                            .setDescription(`**\$${latestPrice.price.close.toFixed(2)}**`)
                                            .setFooter(`as of ${latestPrice.date.toLocaleString('en-us',{timeZone:'America/New_York'})} EST`)

                                        message.channel.send(getPriceEmbed);
                                        //console.log(latestPrice)
                                        //console.log(companyName)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        if (error.message.search("Not Found") != -1) {
                                            message.channel.send("No data could be found on that symbol. Check to make sure you typed it correctly!");
                                        } else {
                                            message.channel.send("Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message and try again!");
                                        }
                                    })
                            }

                            waitCompanyName();
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error))
    }
}
module.exports = StockMarket;