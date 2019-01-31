const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const DBL = require('dblapi.js');
const dbl = new DBL(config.dblToken,client);
//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./scores.sqlite');
const Commands = require('./commands.js');
const Game = require('./game.js');
const BlizzardCmd = require('./blizzard.js');
const Reddit = require('./reddit.js');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.debug);
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
    if (message.channel.type === 'dm') {
        return;
    }
    let consoleTimeStamp = new Date();
    if (message.guild.name !== "Discord Bot List") {
        console.log(consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}),`(${consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'})})`,`${message.author.username} (${message.guild.name}): ${message.content}`);
    }
// REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY ____" OR "ALEXA PLAY ____."
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

// NOT-BOT CHECK
    if (!message.author.bot) {
        Game.profile(client,message);

        if (msgContent === "alexa give me the deets") {
            console.log(client.guilds.map(u => u.name))
        }
        
//
// ALEXA POINTS / SQL TEST
//
        if (msgContent === "alexa" || msgContent.startsWith(`alexa help`) || msgContent.startsWith(`alexa commands`)) {
            Commands.help(message, msgContent);
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
//
// ALEXA TEST COMMAND
//
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

    }
});

client.login(config.token);