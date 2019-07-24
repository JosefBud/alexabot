const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const SQLite = require("better-sqlite3");
const traders = new SQLite('../db/traders.sqlite');
const portfolios = new SQLite('../db/portfolios.sqlite');

const app = express();
const port = 1234;

let tradersTable = [];
let portfoliosTable = [];
let logResults = "";
let fromDate = "";
let fromTime = "00:00:00"
let toDate = "";
let toTime = "23:59:59"
let order = "asc";
let limit = 50;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    logResults: logResults,
    tradersTable: tradersTable,
    portfoliosTable: portfoliosTable
  });
})

app.post('/', function (req, res) {
  winston.add(new winston.transports.File({
    filename: `../logs/${req.body.logName}.log`
  }));

  if (req.body.fromTime) {
    fromTime = req.body.fromTime;
  }
  if (req.body.toTime) {
    toTime = req.body.toTime;
  }
  fromDate = req.body.fromDate + " " + fromTime;
  toDate = req.body.toDate + " " + toTime;
  order = req.body.order;
  limit = parseInt(req.body.limit);

  let searchOptions = {
    from: fromDate,
    until: toDate,
    limit: limit,
    order: order
  }

  winston.query(searchOptions, (err, results) => {
    if (err) {
      throw err;
    }

    switch (req.body.logName) {
      case "fullLog":
        results.file.forEach((entry) => {
          logResults += `[${entry.timestamp}] (${entry.guildName}) ${entry.username}: ${entry.message}\n`
        });
        break;
      case "alexaCalls":
        results.file.forEach((entry) => {
          logResults += `[${entry.timestamp}] (${entry.guild}) ${entry.username}: ${entry.message}\n`
        });
        break;
      case "alexaDMs":
        results.file.forEach((entry) => {
          logResults += `[${entry.timestamp}] ${entry.username}: ${entry.message}\n`
        });
        break;
      case "alexaMusic":
        results.file.forEach((entry) => {
          logResults += `[${entry.timestamp}] (${entry.guildName}) ${entry.username[0]} requested to ${entry.playOrStop} ${entry.videoName} (${entry.videoId}) | Reason: ${entry.endReason}\n`
        });
        break;
    }

  })

  const interval = setInterval(() => {
    if (logResults) {
      clearInterval(interval);
      res.render('index', {
        logResults: logResults,
        tradersTable: tradersTable,
        portfoliosTable: portfoliosTable
      });
      logResults = "";
    }
  }, 100)

})

app.post('/stocks', function (req, res) {
  switch (req.body.sortBy) {
    case "userId":
      tradersTable = traders.prepare("SELECT * FROM traders ORDER BY userId ASC").all();
      break;
    case "username":
      tradersTable = traders.prepare("SELECT * FROM traders ORDER BY username ASC").all();
      break;
    case "money":
      tradersTable = traders.prepare("SELECT * FROM traders ORDER BY money ASC").all();
      break;
  }

  const interval = setInterval(() => {
    if (tradersTable[0]) {
      clearInterval(interval);
      res.render('index', {
        logResults: logResults,
        tradersTable: tradersTable,
        portfoliosTable: portfoliosTable
      });
      tradersTable = [];
    }
  }, 100)
})

app.post('/portfolios', function (req, res) {
  if (req.body.symbol) {
    portfoliosTable = portfolios.prepare("SELECT * FROM portfolios WHERE symbol = ?").all(req.body.symbol);
  } else if (req.body.userId) {
    portfoliosTable = portfolios.prepare("SELECT * FROM portfolios WHERE userId = ?").all(req.body.userId);
  } else if (req.body.name) {
    portfoliosTable = portfolios.prepare("SELECT * FROM portfolios WHERE username = ?").all(req.body.userId);
  } else {
    portfoliosTable = portfolios.prepare("SELECT * FROM portfolios ORDER BY username ASC").all();
  }

  const interval = setInterval(() => {
    if (portfoliosTable[0]) {
      clearInterval(interval);
      res.render('index', {
        logResults: logResults,
        tradersTable: tradersTable,
        portfoliosTable: portfoliosTable
      });
      portfoliosTable = [];
    }
  }, 100)
})

app.listen(port, () => console.log(`Admin panel app listening on port ${port}!`))