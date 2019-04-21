const http = require('http');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const DBL = require('dblapi.js');
const dbl = new DBL(config.dblToken,client);
const SQLite = require("better-sqlite3");
//const sql = new SQLite('./scores.sqlite');
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');
const traders = new SQLite('./db/traders.sqlite');
const Commands = require('./commands.js');
const Game = require('./game.js');
const BlizzardCmd = require('./blizzard.js');
const Reddit = require('./reddit.js');
const StockMarket = require('./stockMarket.js');
const Dnd = require('./dnd.js');
const dndServers = new Set(["271172684543426560", "567383493416321064", "534471291248443423"])
// ^^ the Alexa Experiment, The Safe Space, Bot Test ^^
let status = "LISTENING";

const server = http.createServer(function(request, response) {
    
    let auth = request.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
		console.log("Authorization Header is: ", auth);
		if (auth === config.httpAuth) {
            console.log("AUTHORIZED!")
            let authTimeStamp = new Date();
            let logItAuth = authTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}) + " " + authTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'}) + " " + "Somebody has voted!";
            fs.appendFile('httpCalls.log', "\r\n" + logItAuth, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            })
			if (request.method == 'POST') {
                request.on('data', function (data) {
                    let post = JSON.parse(data);

                    console.log("Somebody has voted!")
                    console.log(post);

                    let voterProfile = traders.prepare("SELECT money FROM traders WHERE userId = ?").get(post.user);
                    if (voterProfile) {
                        let currentDate = new Date();
                        let dayOfWeek = currentDate.getDay();
                        console.log(dayOfWeek);
                        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
                            let voterMoney = voterProfile.money + 1000;
                            traders.prepare("UPDATE traders SET money = ? WHERE userId = ?").run(voterMoney, post.user)

                            client.users.get(post.user).send("Thank you for voting! I've added $1,000 to your wallet, you can check it by using `Alexa stocks profile` in your Discord server.\n Also feel free to join the Alexa Discord server at https://discord.gg/PysGrtD")
                        } else {
                            let voterMoney = voterProfile.money + 500;
                            traders.prepare("UPDATE traders SET money = ? WHERE userId = ?").run(voterMoney, post.user)
                            
                            client.users.get(post.user).send("Thank you for voting! I've added $500 to your wallet, you can check it by using `Alexa stocks profile` in your Discord server.\n Also feel free to join the Alexa Discord server at https://discord.gg/PysGrtD")
                        }
                    } else {return;}
                });
                request.on('end', function () {
                    try {
                      let post = JSON.parse(body);
                      // deal_with_post_data(request,post);
                      console.log(post); // <--- here I just output the parsed JSON
                      response.writeHead(200, {"Content-Type": "text/plain"});
                      response.end();
                      return;
                    } catch (err){
                      response.writeHead(500, {"Content-Type": "text/plain"});
                      response.write("Bad Post Data.  Is your data a proper JSON?\n");
                      response.end();
                      return;
                    }
                });
            }
		} else {
            let deniedTimeStamp = new Date();
            let logItDenied = deniedTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}) + " " + deniedTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'}) + " " + "Unauthorized HTTP request";
            fs.appendFile('httpCalls.log', "\r\n" + logItDenied, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            })
            response.end();
        }
});
server.listen(60000, "0.0.0.0");
console.log("NodeJS HTTP server started")


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    Game.prep(client);

    console.log(client.users.size)

    // SETTING BOT STATUS BETWEEN 'LISTENING TO ALEXA HELP' AND 'PLAYING ALEXA STOCKS'
    setInterval(() => {
        if (status === "LISTENING") {
            client.user.setActivity(`${client.guilds.size} servers`, { type: status })
            status = "PLAYING"
        } else {
            client.user.setActivity('\"Alexa stocks\"', { type: status })
            status = "LISTENING"
        }
    }, 10000)

    // POSTING BOT STATS TO DISCORDBOTS.ORG
    setInterval(() => {
        dbl.postStats(client.guilds.size/*, client.shards.Id, client.shards.total*/);
    }, 1800000);

    dbl.on('posted', () => {
        console.log('Server count posted!');
      });
    
});

client.on('error', console.error);

client.on('message', message => {
    let msgContent = message.content.toLowerCase().replace(/[,'.]/gi,"");

    // IGNORING DIRECT MESSAGES
    if (message.channel.type === 'dm') {
        if (!message.author.bot) {
            Commands.help(message, msgContent);
            let consoleTimeStamp = new Date();
            let logIt = consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}) + " " + consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'}) + " " + message.author.username + ": " + message.content;
            fs.appendFile('alexaDMs.log', "\r\n" + logIt, (err) => {
                if (err) throw err;
                console.log('Alexa has received a DM.');
            })
        }

        return;
    }
    
    // CONVERTING THE MESSAGE TO LOWERCASE AND REPLACING CERTAIN PUNCTUATION

    if (msgContent.startsWith(`alexa come back to`)) {
        Commands.comeBack(message,msgContent);
    }

    let bannedChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE channelId = ?").get(message.channel.id);
    if (bannedChannels) {
        if (bannedChannels.id === `${message.guild.id}-${message.channel.id}`) {
            return;
        }
    }
    let consoleTimeStamp = new Date();
    if (message.guild.name !== "Discord Bot List") {
        console.log(consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}),`(${consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'})})`,`${message.author.username} (${message.guild.name}): ${message.content}`);
    }

    // NOT-BOT CHECK
    if (!message.author.bot) {
        Game.profile(client,message);

        if (msgContent.startsWith("alexasendmessage")) {
            console.log(message.author.id)
            if (message.author.id === "188055552469762049") {
                client.guilds.forEach((guild) => {
                    let defaultChannel = "";
                    guild.channels.forEach((channel) => {
                        //console.log(channel)
                        if(channel.type == "text" && defaultChannel == "") {
                            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                                defaultChannel = channel;
                                defaultChannel.send(message.content.slice(16))
                            }
                        }
                    })
                })
            }
        }

        if (msgContent === "alexa give me the deets") {
            console.log(client.guilds.map(u => u.name))
        }

        if (msgContent.includes("alexa")) {
            let logIt = consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}) + " " + consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'}) + " " + message.author.username + " (" + message.guild.name + "): " + message.content;
            fs.appendFile('alexaCalls.log', "\r\n" + logIt, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            })
        }
        
        if (msgContent === "alexa" || msgContent.startsWith("alexa help") || msgContent.startsWith("alexa commands")) {Commands.help(message, msgContent);}
        if (msgContent.startsWith("alexa test")) {Commands.test(message);}
        if (msgContent.startsWith("alexa vote")) {message.channel.send("Well aren't you just the sweetest lil' thang voting for me... Here ya go, qt: https://discordbots.org/bot/534469636381736981/vote");}
        if (msgContent.startsWith("alexa get out of")) {Commands.getOut(message,msgContent);}
        if (msgContent.startsWith("alexa xp")) {Game.test(message)}
        if (msgContent.startsWith("alexa stage")) {Game.stage(client,message);}
        if (msgContent.startsWith("alexa reset")) {Game.profileReset(message);}
        if (msgContent.startsWith("alexa spend")) {Game.spendSkillPoints(message);}
        if (msgContent.startsWith("alexa create")) {Game.createCharacter(message);}
        if (msgContent.startsWith("alexa flip")) {Game.flipCoin(message);}
        if (msgContent.startsWith("alexa steal")) {Game.stealCoins(client, message);}
        if (msgContent.startsWith("alexa profile")) {Game.getProfile(message);}
        if (msgContent.startsWith("alexa volume")) {Commands.volume(message);}
        if (msgContent.startsWith("alexa play")) {Commands.play(message,msgContent,message.content);}
        if (msgContent.startsWith("alexa queue")) {Commands.queue(message);}
        if (msgContent.startsWith("alexa next")) {Commands.next(message);}
        if (msgContent.startsWith("alexa clear queue")) {Commands.clearQueue(message);}
        if (msgContent.startsWith("alexa stfu") || msgContent.startsWith("alexa shut up") || msgContent.startsWith("alexa fuck off")) {Commands.stfu(message);}
        if (msgContent.startsWith("alexa buy")) {Commands.buy(message,client);}
        if (msgContent.replace(/[o]/gi,"").includes("thats s sad") || msgContent.replace(/[o]/gi,"").includes("that is s sad") || msgContent.replace(/[o]/gi,"").includes("that is just s sad")) {Commands.thatsSoSad(message);}
        if (msgContent.startsWith("alexa fuck ea")) {message.channel.send("EA bAd gErAlDo gOoD");}
        if (msgContent.startsWith("alexa wow profile")) {BlizzardCmd.test(message, msgContent, client);}
        if (msgContent.startsWith("alexa give me a meme")) {
            Reddit.randomMeme(message);
            let memesProvided = require('./memesProvided.json');
            memesProvided.memesProvided++;
            fs.writeFile('./memesProvided.json', JSON.stringify(memesProvided), (err) => {if (err) throw err;});
        }
        if (msgContent.startsWith("alexa give me /r/")) {Reddit.giveSub(message);}
        if (msgContent.startsWith("alexa minesweeper")) {Commands.minesweeper(message);}
        if (msgContent.startsWith("alexa stocks start")) {StockMarket.create(message);}
        if (msgContent.startsWith("alexa stocks portfolio") || msgContent.startsWith("alexa stocks profile") || msgContent.startsWith("alexa stocks wallet") || msgContent.startsWith("alexa stocks money")) {StockMarket.viewPortfolio(message);}  
        if (msgContent.startsWith("alexa stocks buy")) {StockMarket.buyShares(message);}
        if (msgContent.startsWith("alexa stocks sell")) {StockMarket.sellShares(message);}
        if (msgContent.startsWith("alexa stocks price")) {StockMarket.getPrice(message);}
        if (msgContent.startsWith("alexa stocks history")) {StockMarket.getHistory(message);}
        if (msgContent.startsWith("alexa stocks search")) {StockMarket.search(message);}
        if (msgContent.startsWith("alexa stocks leaderboard")) {StockMarket.leaderboard(message);}
        if (msgContent.startsWith("alexa stocks help") || msgContent === "alexa stocks") {StockMarket.help(message);}
        if (msgContent.startsWith("alexa what is the weather") || msgContent.startsWith("alexa how is the weather")) {Commands.whatIsWeather(message);}
        if (msgContent.startsWith("!it") && dndServers.has(message.guild.id)) {Dnd.itemLookup(message);}
        if (msgContent.startsWith("!sp") && dndServers.has(message.guild.id)) {Dnd.spellLookup(message); console.log("test")}
        if (msgContent.startsWith("!f") && dndServers.has(message.guild.id)) {Dnd.featLookup(message);}
        if (msgContent.startsWith("!artificer") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(11); Dnd.classFeatLookup(message, "Artificer", query);}
        if (msgContent.startsWith("!barbarian") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(11); Dnd.classFeatLookup(message, "Barbarian", query);}
        if (msgContent.startsWith("!bard") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(6); Dnd.classFeatLookup(message, "Bard", query);}
        if (msgContent.startsWith("!cleric") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(8); Dnd.classFeatLookup(message, "Cleric", query);}
        if (msgContent.startsWith("!druid") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(5); Dnd.classFeatLookup(message, "Druid", query);}
        if (msgContent.startsWith("!fighter") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(8); Dnd.classFeatLookup(message, "Fighter", query);}
        if (msgContent.startsWith("!monk") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(6); Dnd.classFeatLookup(message, "Monk", query);}
        if (msgContent.startsWith("!mystic") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(8); Dnd.classFeatLookup(message, "Mystic", query);}
        if (msgContent.startsWith("!paladin") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(9); Dnd.classFeatLookup(message, "Paladin", query);}
        if (msgContent.startsWith("!ranger") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(8); Dnd.classFeatLookup(message, "Ranger", query);}
        if (msgContent.startsWith("!rogue") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(7); Dnd.classFeatLookup(message, "Rogue", query);}
        if (msgContent.startsWith("!rune scribe") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(13); Dnd.classFeatLookup(message, "Rune Scribe", query);}
        if (msgContent.startsWith("!sorcerer") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(10); Dnd.classFeatLookup(message, "Sorcerer", query);}
        if (msgContent.startsWith("!warlock") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(9); Dnd.classFeatLookup(message, "Warlock", query);}
        if (msgContent.startsWith("!wizard") && dndServers.has(message.guild.id)) {let query = message.content.toLowerCase().slice(8); Dnd.classFeatLookup(message, "Wizard", query);}
    }
});

client.login(config.token);