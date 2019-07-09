const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const portfolios = new SQLite('./db/portfolios.sqlite');
const traders = new SQLite('./db/traders.sqlite');

const PortfolioEditor = {
    changeQty: async function (message) {
        const messageArray = message.content.split(" ");
        const qty = parseInt(messageArray[5]);
        const userId = messageArray[3];
        const symbol = messageArray[4];
        portfolios.prepare("UPDATE portfolios SET qty = ? WHERE userId = ? AND symbol = ?").run(qty, userId, symbol);
        message.channel.send(`Updated the portfolio of ${userId} to have ${qty} shares of ${symbol}`);
    },

    changeMoney: async function (message) {
        const messageArray = message.content.split(" ");
        const userId = messageArray[3];
        const money = messageArray[4];
        traders.prepare("UPDATE traders SET money = ? WHERE userId = ?").run(money, userId);
        message.channel.send(`Updated the portfolio of ${userId} to have $${money}`);
    }
}

module.exports = PortfolioEditor;