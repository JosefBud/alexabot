const config = require('./config.json');
const SQLite = require("better-sqlite3");

const portfolios = new SQLite('./db/portfolios.sqlite');
const traders = new SQLite('./db/traders.sqlite');

portfolios.prepare("ALTER TABLE portfolios ADD username TEXT").run();

const traderMatches = traders.prepare("SELECT * FROM traders").all();

traderMatches.forEach((trader) => {
    portfolios.prepare("UPDATE portfolios SET username = ? WHERE userId = ?").run(trader.username, trader.userId);
    console.log(`Updated ${trader.userId} with their username, ${trader.username}`);
})