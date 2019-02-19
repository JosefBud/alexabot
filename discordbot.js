const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const fs = require('fs');
const DBL = require('dblapi.js');
const dbl = new DBL(config.dblToken,client);
const SQLite = require("better-sqlite3");
//const sql = new SQLite('./scores.sqlite');
const bannedChannelsSql = new SQLite('./bannedChannels.sqlite');
const Commands = require('./commands.js');
const Game = require('./game.js');
const BlizzardCmd = require('./blizzard.js');
const Reddit = require('./reddit.js');
const StockMarket = require('./stockMarket.js');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.debug);
    client.user.setActivity('\"Alexa help\"', { type: 'LISTENING' })
    Game.prep(client);
    //if (user.guild.voiceConnection) {
    //    user.guild.voiceConnection.disconnect();
    //}
    
    setInterval(() => {
        dbl.postStats(client.guilds.size/*, client.shards.Id, client.shards.total*/);
    }, 1800000);
    dbl.on('posted', () => {
        console.log('Server count posted!');
      });
      
});

client.on('error', console.error);

client.on('message', message => {
// IGNORING DIRECT MESSAGES
    if (message.channel.type === 'dm') {
        return;
    }

// CONVERTING THE MESSAGE TO LOWERCASE AND REPLACING CERTAIN PUNCTUATION
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

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
// REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY ____" OR "ALEXA PLAY ____."

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

        if (msgContent.startsWith("alexa")) {
            let logIt = consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}) + " " + consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'}) + " " + message.author.username + " (" + message.guild.name + "): " + message.content;
            fs.appendFile('alexaCalls.log', "\r\n" + logIt, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            })
        }
        
        if (msgContent === "alexa" || msgContent.startsWith(`alexa help`) || msgContent.startsWith(`alexa commands`)) {
            Commands.help(message, msgContent);
        }

        if (msgContent === "alexa vote") {
            message.channel.send("Well aren't you just the sweetest lil' thang voting for me... Here ya go, qt: https://discordbots.org/bot/534469636381736981/vote");
        }

        if (msgContent.startsWith(`alexa get out of`)) {
            Commands.getOut(message,msgContent);
        }

        if (msgContent.startsWith(`alexa xp`)) {
            //message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
            //console.log(score)
            Game.test(message)
        }

        if (msgContent.startsWith(`alexa stage`)) {
            Game.stage(client,message);

        }

        if (msgContent.startsWith(`alexa reset`)) {
            Game.profileReset(message);
        }

        if (msgContent.startsWith(`alexa spend`)) {
            Game.spendSkillPoints(message);
        }

        if (msgContent.startsWith(`alexa create`)) {
            Game.createCharacter(message);
        }

        if (msgContent.startsWith(`alexa flip`)) {
            Game.flipCoin(message);
        }

        if (msgContent.startsWith(`alexa steal`)) {
            Game.stealCoins(client, message);
        }

        if (msgContent.startsWith(`alexa profile`)) {
            Game.getProfile(message);
        }

        if (msgContent.startsWith(`alexa test`)) {
            Game.test(message);
        }

        if (msgContent.startsWith(`alexa volume`)) {
            Commands.volume(message);
        }

        if (msgContent.startsWith(`alexa play`)) {
           Commands.play(message,msgContent);
        }

        if (msgContent.startsWith("alexa queue")) {
            Commands.queue(message);
        }

        if (msgContent.startsWith("alexa next")) {
            Commands.next(message);
        }

        if (msgContent.startsWith("alexa clear queue")) {
            Commands.clearQueue(message);
        }
        
        if (msgContent.startsWith("alexa stfu") || msgContent.startsWith("alexa shut up") || msgContent.startsWith("alexa fuck off")) {
            Commands.stfu(message);
        }
        
        if (msgContent.startsWith("alexa buy")) {
            Commands.buy(message,client);
        }

        //
        // THAT'S SO SAD COMMAND, WHICH PROMPTS ALEXA TO ASK IF YOU WANT TO PLAY DESPACITO
        //
        if (msgContent.replace(/[o]/gi,"").includes("thats s sad") || msgContent.replace(/[o]/gi,"").includes("that is s sad") || msgContent.replace(/[o]/gi,"").includes("that is just s sad")) {
            Commands.thatsSoSad(message);
        }

        // DAD BOT COMMAND
        /*
        if (msgContent.startsWith("im ")) {
            if (message.guild.id !== "221109478911639553") {
                console.log(message.guild.id)
                Commands.dadBot(message,msgContent);
            }
        }
        */

        if (msgContent.startsWith("alexa fuck ea")) {
            message.channel.send(`EA bAd gErAlDo gOoD`);
        }

        if (msgContent.startsWith("alexa wow profile")) {
            BlizzardCmd.test(message, msgContent, client);
        }

        if (msgContent.startsWith("alexa give me a meme")) {
            Reddit.randomMeme(message);
        }

        if (msgContent.startsWith("alexa give me /r/")) {
            Reddit.giveSub(message);
        }

        if (msgContent.startsWith("alexa stocks start")) {
            StockMarket.create(message);
        }

        if (msgContent.startsWith("alexa stocks portfolio") || msgContent.startsWith("alexa stocks profile") || msgContent.startsWith("alexa stocks wallet") || msgContent.startsWith("alexa stocks money")) {
            StockMarket.viewPortfolio(message);
        }  

        if (msgContent.startsWith("alexa stocks buy")) {
            StockMarket.buyShares(message);
        }

        if (msgContent.startsWith("alexa stocks sell")) {
            StockMarket.sellShares(message);
        }

        if (msgContent.startsWith("alexa stocks price")) {
            StockMarket.getPrice(message);
        }

        if (msgContent.startsWith("alexa stocks history")) {
            StockMarket.getHistory(message);
        }

        if (msgContent.startsWith("alexa stocks search")) {
            StockMarket.search(message);
        }

        if (msgContent.startsWith("alexa stocks test")) {
            StockMarket.test(message);
        }

        if (msgContent.startsWith("alexa stocks help") || msgContent === "alexa stocks") {
            StockMarket.help(message);
        }

    }
});

client.login(config.token);