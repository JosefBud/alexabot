const Discord = require('discord.js');
const algotrader = require('algotrader');
const Yahoo = algotrader.Data.Yahoo;
const Query = algotrader.Data.Query;
const IEX = algotrader.Data.IEX;
const StockMarket = require('./stockMarket.js')

const SMFunctions = {
    companyLogo: "",
    companyName: "",
    companySearch: {},
    stockPrice: 0,
    stockHistory: {},
    oopsie: "Someone made an oopsie. Either that stock symbol doesn't exist, or my owner's coding sucks. Most likely the latter but check your message/symbol and try again!",

    getLogo: async function (symbol, message) {
        await IEX.getLogo(symbol)
            .then(result => {
                SMFunctions.companyLogo = result;
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
                SMFunctions.companyName = results[0].name;
            })
            .catch(error => {
                console.log(error)
                SMFunctions.companyName = "";
                message.channel.send(SMFunctions.oopsie);
            })
    },

    getSearch: async function(search, message) {
        await Query.search(search)
            .then(results => {
                SMFunctions.companySearch = results[0];
            })
            .catch(error => {
                console.log(error)
                SMFunctions.companySearch = {};
                message.channel.send(SMFunctions.oopsie);
            })
    },

    getPrice: async function(symbol, message) {
        await Yahoo.getQuotes(symbol,"1m","1m",true)
            .then(result => {
                let latestPrice = result.pop();
                SMFunctions.stockPrice = latestPrice;
            })
            .catch(error => {
                console.log(error)
                SMFunctions.stockPrice = 0;
                message.channel.send(SMFunctions.oopsie);
            })
    },

    getHistory: async function(symbol, message) {
        await IEX.getStats(symbol)
            .then(results => {
                SMFunctions.stockHistory = results;
            })
            .catch(error => {
                console.log(error)
                SMFunctions.stockHistory = {};
                message.channel.send(SMFunctions.oopsie);
            })
    }

}

module.exports = SMFunctions;