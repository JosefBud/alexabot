const http = require('http');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const DBL = require('dblapi.js');
const winston = require('winston');
const dbl = new DBL(config.dblToken, client);

const SQLite = require("better-sqlite3");
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');
const traders = new SQLite('./db/traders.sqlite');

const Game = require('./game.js');
//const BlizzardCmd = require('./blizzard.js');
const Reddit = require('./reddit.js');
const StockMarket = require('./stockMarket.js');
const Dnd = require('./dnd.js');
const VoiceRecog = require('./voiceRecog.js');
const PortfolioEditor = require('./portfolioEditor.js');

const help = require('./commands/help.js');
const musicVolume = require('./commands/musicVolume.js');
const musicPlay = require('./commands/musicPlay.js');
const musicQueue = require('./commands/musicQueue.js');
const musicNext = require('./commands/musicNext.js');
const musicClearQueue = require('./commands/musicClearQueue.js');
const musicStfu = require('./commands/musicStfu.js');
const musicPause = require('./commands/musicPause.js');
const musicResume = require('./commands/musicResume.js');
const musicLyrics = require('./commands/musicLyrics.js');
const thatsSoSad = require('./commands/thatsSoSad.js');
const buy = require('./commands/buy.js');
const getOut = require('./commands/getOut.js');
const comeBack = require('./commands/comeBack.js');
const minesweeper = require('./commands/minesweeper.js');
const whatIsWeather = require('./commands/whatIsWeather.js');

const featureTracker = require('./featureTracker.js');
const josef = "188055552469762049";
const dndServers = new Set(["271172684543426560", "567383493416321064", "534471291248443423"]);
const alexaMods = new Set(["207297782195683329", "183386090143612928", "188055552469762049"]);
// ^^ the Alexa Experiment, The Safe Space, Bot Test ^^
let status = "LISTENING";


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    Game.prep(client);

    console.log(client.users.size);

    // SETTING BOT STATUS BETWEEN 'LISTENING TO # SERVERS' AND 'PLAYING ALEXA STOCKS'
    setInterval(() => {
        if (status === "LISTENING") {
            client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    client.user.setActivity(`${results.reduce((prev, guildCount) => prev + guildCount, 0)} servers`, {
                        type: status
                    });

                    status = "PLAYING";
                })
                .catch(console.error);
        } else {
            client.user.setActivity('\"Alexa stocks\"', {
                type: status
            })
            status = "LISTENING"
        }
    }, 10000)

    // POSTING BOT STATS TO DISCORDBOTS.ORG
    if (client.shard.id === 2) {
        setInterval(() => {
            client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    let serverCount = results.reduce((prev, guildCount) => prev + guildCount, 0);
                    dbl.postStats(serverCount, client.shard.id, client.shard.count);
                })
                .catch(console.error);

        }, 1800000);
    }

    dbl.on('posted', () => {
        console.log('Server count posted!');
    });

    let currentlyPlaying = {
        total: 0,
        servers: []
    }
    fs.writeFile('./currentlyPlaying.json', JSON.stringify(currentlyPlaying), (err) => {
        if (err) throw err;
    })

    if (client.shard.id === 0) {
        const server = http.createServer(function (request, response) {

            let auth = request.headers['authorization']; // auth is in base64(username:password)  so we need to decode the base64
            console.log("Authorization Header is: ", auth);
            if (auth === config.httpAuth) {
                console.log("AUTHORIZED!")
                let authTimeStamp = new Date();
                let logItAuth = authTimeStamp.toLocaleDateString('en-us', {
                    timeZone: 'America/New_York'
                }) + " " + authTimeStamp.toLocaleTimeString('en-us', {
                    timeZone: 'America/New_York'
                }) + " " + "Somebody has voted!";
                fs.appendFile('httpCalls.log', "\r\n" + logItAuth, (err) => {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                })
                if (request.method == 'POST') {
                    request.on('data', function (data) {
                        let post = JSON.parse(data);

                        const voteLog = winston.createLogger({
                            level: 'info',
                            format: winston.format.combine(
                                winston.format.timestamp({
                                    format: 'YYYY-MM-DD HH:mm:ss'
                                }),
                                winston.format.json()
                            ),
                            transports: [
                                new winston.transports.File({
                                    filename: './logs/alexaVotes.log'
                                })
                            ]
                        })

                        voteLog.log({
                            level: 'info',
                            user: post.user,
                            content: post
                        })

                        let voterProfile = traders.prepare("SELECT money FROM traders WHERE userId = ?").get(post.user);
                        if (voterProfile) {
                            let currentDate = new Date();
                            let dayOfWeek = currentDate.getDay();
                            if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
                                let voterMoney = voterProfile.money + 1000;
                                traders.prepare("UPDATE traders SET money = ? WHERE userId = ?").run(voterMoney, post.user)

                                client.users.get(post.user).send("Thank you for voting! I've added $1,000 to your wallet, you can check it by using `Alexa stocks profile` in your Discord server.\n Also feel free to join the Alexa Discord server at https://discord.gg/PysGrtD")
                            } else {
                                let voterMoney = voterProfile.money + 500;
                                traders.prepare("UPDATE traders SET money = ? WHERE userId = ?").run(voterMoney, post.user)

                                client.users.get(post.user).send("Thank you for voting! I've added $500 to your wallet, you can check it by using `Alexa stocks profile` in your Discord server.\n Also feel free to join the Alexa Discord server at https://discord.gg/PysGrtD")
                            }
                        } else {
                            return;
                        }
                    });
                    request.on('end', function () {
                        try {
                            let post = JSON.parse(body);
                            console.log(post);
                            response.writeHead(200, {
                                "Content-Type": "text/plain"
                            });
                            response.end();
                            return;
                        } catch (err) {
                            response.writeHead(500, {
                                "Content-Type": "text/plain"
                            });
                            response.write("Bad Post Data.  Is your data a proper JSON?\n");
                            response.end();
                            return;
                        }
                    });
                }
            } else {
                let deniedTimeStamp = new Date();
                let logItDenied = deniedTimeStamp.toLocaleDateString('en-us', {
                    timeZone: 'America/New_York'
                }) + " " + deniedTimeStamp.toLocaleTimeString('en-us', {
                    timeZone: 'America/New_York'
                }) + " " + "Unauthorized HTTP request";
                fs.appendFile('httpCalls.log', "\r\n" + logItDenied, (err) => {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                })
                response.end();
            }
        });
        server.listen(60000, "0.0.0.0");
        console.log("NodeJS HTTP server started")
    }
});

client.on('error', console.error);

client.on('message', message => {
    let msgContent = message.content.toLowerCase().replace(/[,'.]/gi, "");

    // DIRECT MESSAGES
    if (message.channel.type === 'dm') {
        if (!message.author.bot) {
            help(message, msgContent);

            const dmLog = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.json()
                ),
                transports: [
                    new winston.transports.File({
                        filename: './logs/alexaDMs.log'
                    })
                ]
            })

            dmLog.log({
                level: 'info',
                username: message.author.username,
                message: message.content
            })
        }

        return;
    }

    // CONVERTING THE MESSAGE TO LOWERCASE AND REPLACING CERTAIN PUNCTUATION

    if (msgContent.startsWith(`alexa come back to`)) {
        comeBack(message, msgContent);
        featureTracker("comeBack");
    }

    let bannedChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE channelId = ?").get(message.channel.id);
    if (bannedChannels) {
        if (bannedChannels.id === `${message.guild.id}-${message.channel.id}`) {
            return;
        }
    }
    let consoleTimeStamp = new Date();
    if (message.guild.name !== "Discord Bot List") {
        const fullLog = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({
                    filename: `./logs/fullLog-${consoleTimeStamp.getFullYear()}-${consoleTimeStamp.getMonth() + 1}-${consoleTimeStamp.getDate()}.log`
                })
            ]
        })

        fullLog.log({
            level: 'info',
            guildName: message.guild.name,
            username: message.author.username,
            message: message.content
        })
    }

    // NOT-BOT CHECK
    if (!message.author.bot) {
        Game.profile(client, message);

        if (msgContent.startsWith("alexasendmessage")) {
            if (message.author.id === "188055552469762049") {
                client.guilds.forEach((guild) => {
                    let defaultChannel = "";
                    guild.channels.forEach((channel) => {
                        if (channel.type == "text" && defaultChannel == "") {
                            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                                defaultChannel = channel;
                                defaultChannel.send(message.content.slice(16))
                            }
                        }
                    })
                })
            }
        }

        if (msgContent.startsWith("alexa portfolioeditor") && message.author.id === josef) {
            const request = msgContent.split(" ")
            if (request[2] === "qty") {
                PortfolioEditor.changeQty(message);
            } else if (request[2] === "money") {
                PortfolioEditor.changeMoney(message);
            } else if (request[2] === "remove") {
                PortfolioEditor.removeStock(message);
            }
        }

        if (msgContent === "alexa give me the deets" && message.author.id === josef) {
            message.channel.send("`alexa portfolioeditor qty [userId] [stockSymbol] [newQty]`\n`alexa portfolioeditor money [userId] [newBalance]`\n`alexa portfolioeditor remove [userId] [stockSymbol]`")
        }

        if (msgContent.startsWith("!it") && dndServers.has(message.guild.id)) {
            Dnd.itemLookup(message);
            return;
        }
        if (msgContent.startsWith("!sp") && dndServers.has(message.guild.id)) {
            Dnd.spellLookup(message);
            return;
        }
        if (msgContent.startsWith("!f") && dndServers.has(message.guild.id)) {
            Dnd.featLookup(message);
            return;
        }
        if (msgContent.startsWith("!artificer") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(11);
            Dnd.classFeatLookup(message, "Artificer", query);
            return;
        }
        if (msgContent.startsWith("!barbarian") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(11);
            Dnd.classFeatLookup(message, "Barbarian", query);
            return;
        }
        if (msgContent.startsWith("!bard") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(6);
            Dnd.classFeatLookup(message, "Bard", query);
            return;
        }
        if (msgContent.startsWith("!cleric") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(8);
            Dnd.classFeatLookup(message, "Cleric", query);
            return;
        }
        if (msgContent.startsWith("!druid") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(5);
            Dnd.classFeatLookup(message, "Druid", query);
            return;
        }
        if (msgContent.startsWith("!fighter") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(8);
            Dnd.classFeatLookup(message, "Fighter", query);
            return;
        }
        if (msgContent.startsWith("!monk") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(6);
            Dnd.classFeatLookup(message, "Monk", query);
            return;
        }
        if (msgContent.startsWith("!mystic") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(8);
            Dnd.classFeatLookup(message, "Mystic", query);
            return;
        }
        if (msgContent.startsWith("!paladin") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(9);
            Dnd.classFeatLookup(message, "Paladin", query);
            return;
        }
        if (msgContent.startsWith("!ranger") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(8);
            Dnd.classFeatLookup(message, "Ranger", query);
            return;
        }
        if (msgContent.startsWith("!rogue") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(7);
            Dnd.classFeatLookup(message, "Rogue", query);
            return;
        }
        if (msgContent.startsWith("!rune scribe") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(13);
            Dnd.classFeatLookup(message, "Rune Scribe", query);
            return;
        }
        if (msgContent.startsWith("!sorcerer") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(10);
            Dnd.classFeatLookup(message, "Sorcerer", query);
            return;
        }
        if (msgContent.startsWith("!warlock") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(9);
            Dnd.classFeatLookup(message, "Warlock", query);
            return;
        }
        if (msgContent.startsWith("!wizard") && dndServers.has(message.guild.id)) {
            let query = message.content.toLowerCase().slice(8);
            Dnd.classFeatLookup(message, "Wizard", query);
            return;
        }

        if (msgContent.includes("alexa")) {
            const alexaCallsLog = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.json()
                ),
                transports: [
                    new winston.transports.File({
                        filename: './logs/alexaCalls.log'
                    })
                ]
            })

            alexaCallsLog.log({
                level: 'info',
                guild: message.guild.name,
                username: message.author.username,
                message: message.content
            })
        } else {
            return;
        }

        if (msgContent === "alexa" || msgContent.startsWith("alexa help") || msgContent.startsWith("alexa commands")) {
            help(message, msgContent);
            featureTracker("help");
            return;
        }

        /* if (msgContent.startsWith("alexa listen")) {
            VoiceRecog.listen(client, message);
        } */

        if (msgContent.startsWith("alexa vote")) {
            message.channel.send("Well aren't you just the sweetest lil' thang voting for me... Here ya go, qt: https://discordbots.org/bot/534469636381736981/vote");
            featureTracker("vote");
            return;
        }
        if (msgContent.startsWith("alexa get out of")) {
            getOut(message, msgContent);
            featureTracker("getOut");
            return;
        }
        if (msgContent.startsWith("alexa xp")) {
            Game.test(message);
            return;
        }
        if (msgContent.startsWith("alexa stage")) {
            Game.stage(client, message);
            return;
        }
        if (msgContent.startsWith("alexa reset")) {
            Game.profileReset(message);
            return;
        }
        if (msgContent.startsWith("alexa spend")) {
            Game.spendSkillPoints(message);
            return;
        }
        if (msgContent.startsWith("alexa create")) {
            Game.createCharacter(message);
            return;
        }
        if (msgContent.startsWith("alexa flip")) {
            Game.flipCoin(message);
            featureTracker("flip");
            return;
        }
        if (msgContent.startsWith("alexa steal")) {
            Game.stealCoins(client, message);
            featureTracker("steal");
            return;
        }
        if (msgContent.startsWith("alexa profile")) {
            Game.getProfile(message);
            featureTracker("profile");
            return;
        }
        if (msgContent.startsWith("alexa volume")) {
            musicVolume(message);
            featureTracker("volume");
            return;
        }
        if (msgContent.startsWith("alexa play ")) {
            musicPlay.musicPlay(message, msgContent, message.content, client);
            featureTracker("play");
            return;
        }
        if (msgContent.startsWith("alexa pause")) {
            musicPause(message, client, message.author.username);
            featureTracker("pause");
            return;
        }
        if (msgContent.startsWith("alexa resume") || msgContent.startsWith("alexa unpause") || msgContent === "alexa play") {
            musicResume(message, client, message.author.username);
            featureTracker("resume");
            return;
        }
        if (msgContent.startsWith("alexa queue")) {
            musicQueue(message);
            featureTracker("queue");
            return;
        }
        if (msgContent.startsWith("alexa next")) {
            musicNext(message, client);
            featureTracker("next");
            return;
        }
        if (msgContent.startsWith("alexa clear queue")) {
            musicClearQueue(message);
            featureTracker("clearQueue");
            return;
        }
        if (msgContent.startsWith("alexa stfu") || msgContent.startsWith("alexa shut up") || msgContent.startsWith("alexa fuck off")) {
            musicStfu(message);
            featureTracker("stfu");
            return;
        }

        if (msgContent.startsWith("alexa lyrics")) {
            musicLyrics(message);
            featureTracker("lyrics");
            return;
        }
        if (msgContent.startsWith("alexa buy")) {
            buy(message, client);
            featureTracker("buy");
            return;
        }
        if (msgContent.replace(/[o]/gi, "").includes("thats s sad") || msgContent.replace(/[o]/gi, "").includes("that is s sad") || msgContent.replace(/[o]/gi, "").includes("that is just s sad")) {
            thatsSoSad(message, client);
            featureTracker("thatsSoSad");
            return;
        }
        if (msgContent.startsWith("alexa fuck ea")) {
            message.channel.send("EA bAd gErAlDo gOoD");
            return;
        }
        //if (msgContent.startsWith("alexa wow profile")) {BlizzardCmd.test(message, msgContent, client); featureTracker("wowProfile");}
        if (msgContent.startsWith("alexa give me a meme")) {
            Reddit.randomMeme(message);
            featureTracker("meme");
            return;
        }
        if (msgContent.startsWith("alexa give me /r/")) {
            Reddit.giveSub(message);
            featureTracker("subreddit");
            return;
        }
        if (msgContent.startsWith("alexa minesweeper")) {
            minesweeper(message);
            featureTracker("minesweeper");
            return;
        }
        if (msgContent.startsWith("alexa stocks start")) {
            StockMarket.create(message);
            featureTracker("stocksStart");
            return;
        }
        if (msgContent.startsWith("alexa stocks portfolio") || msgContent.startsWith("alexa stocks profile") || msgContent.startsWith("alexa stocks wallet") || msgContent.startsWith("alexa stocks money")) {
            StockMarket.viewPortfolio(message);
            featureTracker("stocksProfile");
            return;
        }
        if (msgContent.startsWith("alexa stocks buy")) {
            StockMarket.buyShares(message);
            featureTracker("stocksBuy");
            return;
        }
        if (msgContent.startsWith("alexa stocks sell")) {
            StockMarket.sellShares(message);
            featureTracker("stocksSell");
            return;
        }
        if (msgContent.startsWith("alexa stocks price")) {
            StockMarket.getPrice(message);
            featureTracker("stocksPrice");
            return;
        }
        if (msgContent.startsWith("alexa stocks history")) {
            StockMarket.getHistory(message);
            featureTracker("stocksHistory");
            return;
        }
        if (msgContent.startsWith("alexa stocks search")) {
            StockMarket.search(message);
            featureTracker("stocksSearch");
            return;
        }
        if (msgContent.startsWith("alexa stocks top gainers")) {
            StockMarket.topGainers(message);
            featureTracker("stocksGainers");
            return;
        }
        if (msgContent.startsWith("alexa stocks leaderboard")) {
            StockMarket.leaderboard(message);
            featureTracker("stocksLeaderboard");
            return;
        }
        if (msgContent.startsWith("alexa stocks help") || msgContent === "alexa stocks") {
            StockMarket.help(message);
            featureTracker("stocksHelp");
            return;
        }
        if (msgContent.startsWith("alexa what is the weather") || msgContent.startsWith("alexa how is the weather")) {
            whatIsWeather(message);
            featureTracker("weather");
            return;
        }

        if (msgContent.startsWith("alexa give money") && alexaMods.has(message.member.id)) {
            if (message.mentions.users.array()[0]) {
                let luckyWinner = message.mentions.users.array()[0].username;
                let amount;
                if (message.content.split(" ")[4]) {
                    if (parseInt(message.content.split(" ")[4])) {
                        amount = message.content.split(" ")[4];
                    } else {
                        return;
                    }
                } else {
                    return;
                }

                message.channel.send(`$${amount} sent to ${luckyWinner}'s profile!`);
                return;
            } else {
                let amount;
                if (message.content.split(" ")[3]) {
                    if (parseInt(message.content.split(" ")[3])) {
                        amount = message.content.split(" ")[3];
                    } else {
                        return;
                    }

                } else {
                    return;
                }

                message.channel.send(`$${amount} added to your profile!`);
                return;
            }
        }

        if (msgContent.startsWith("alexa take money") && alexaMods.has(message.member.id)) {
            if (message.mentions.users.array()[0]) {
                let luckyWinner = message.mentions.users.array()[0].username;
                let amount;
                if (message.content.split(" ")[4]) {
                    if (parseInt(message.content.split(" ")[4])) {
                        amount = message.content.split(" ")[4];
                    } else {
                        return;
                    }
                } else {
                    return;
                }

                message.channel.send(`$${amount} taken from ${luckyWinner}'s profile and added to yours!`);
                return;
            } else {
                return;
            }
        }

        if (msgContent.startsWith("alexa ")) {
            message.channel.send("Hmm, I don't know that one.");
            return;
        }
    }
});

client.login(config.token);