const Discord = require('discord.js');
const algotrader = require('algotrader');
const axios = require('axios');
const config = require('./config.json');
const Yahoo = algotrader.Data.Yahoo;
const Query = algotrader.Data.Query;
const IEX = algotrader.Data.IEX;
const StockMarket = require('./stockMarket.js')

const SMFunctions = {
    companyLogo: "",
    companyName: {},
    companySearch: {},
    stockPrice: {},
    stockHistory: {},
    topGainersArray: [],
    oopsie: "Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message/symbol and try again!",

    getLogo: async function (symbol, message) {
        await IEX.getLogo(symbol)
            .then(results => {
                SMFunctions.companyLogo = results;
            })
            .catch(error => {
                console.log(error)
                SMFunctions.companyLogo = "";
                message.channel.send("Someone made an oopsie. For some reason I couldn't find a company logo for that symbol, sorry!");
            })
    },

    getCompanyName: async function (symbol, message) {
        await Query.search(symbol)
            .then(results => {
                SMFunctions.companyName[message.author.id] = results[0].name;
            })
            .catch(error => {
                console.log(error)
                message.channel.send(SMFunctions.oopsie);
            })
    },

    getSearch: async function(search, message) {
        await Query.search(search)
            .then(results => {
                SMFunctions.companySearch[message.author.id] = results[0]
                console.log(SMFunctions.companySearch);
            })
            .catch(error => {
                console.log(error)
                message.channel.send(SMFunctions.oopsie);
            })
    },

    getPrice: async function(symbol, message) {
        return new Promise(async (resolve, reject) => {
            await IEX.getQuote(symbol,"1d","1m",true)
            .then(results => {
                let latestPrice = results;
                SMFunctions.stockPrice[message.author.id] = latestPrice;
                resolve();
            })
            .catch(error => {
                console.log(error);
                if (message.channel) {
                    message.channel.send(SMFunctions.oopsie);
                }
            })
        })
        
    },

    getHistory: async function(symbol, message) {
        return new Promise(resolve => {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/stats`, {
                params: {
                token: config.iexCloudKey
                }
            })
                .then(results => {
                    SMFunctions.stockHistory[message.author.id] = results.data;
                    console.log(results.data);
                    resolve();
                })
                .catch(error => {
                    console.log(error)
                    message.channel.send(SMFunctions.oopsie);
                })
        })
    },

    getTopGainers: async function(message) {
        await Query.getTopGainers(5)
            .then(results => {
                SMFunctions.topGainersArray = results;
            })
    }

}

module.exports = SMFunctions;