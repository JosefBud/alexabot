const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./scores.sqlite');
const Commands = require('./commands.js');
const Game = require('./game.js');
const BlizzardCmd = require('./blizzard.js');
var thatsSoSad = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.debug);
    Game.prep(client);
});

client.on('message', message => {
    let consoleTimeStamp = new Date();
    console.log(consoleTimeStamp.toLocaleDateString('en-us','America/New_York'),`(${consoleTimeStamp.toLocaleTimeString('en-us','America/New_York')})`,`${message.author.username} (${message.guild.name}): ${message.content}`);

// REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY ____" OR "ALEXA PLAY ____."
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

// NOT-BOT CHECK
    if (!message.author.bot) {
        Game.profile(client,message);
    
//
// ALEXA POINTS / SQL TEST
//
        if (msgContent.includes(`alexa xp`)) {
            //message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
            //console.log(score)
            Game.test(message)
        }

        if (msgContent.includes(`alexa stage`)) {
            Game.stage(client,message);

        }

        if (msgContent.includes(`alexa reset`)) {
            Game.profileReset(message);
        }

        if (msgContent.includes(`alexa spend`)) {
            Game.spendSkillPoints(message);
        }

        if (msgContent.includes(`alexa create`)) {
            Game.createCharacter(message);
        }

        if (msgContent.includes(`alexa flip`)) {
            Game.flipCoin(message);
        }

        if (msgContent.includes(`alexa steal`)) {
            Game.stealCoins(client, message);
        }

        if (msgContent.includes(`alexa profile`)) {
            Game.getProfile(message);
        }
//
// ALEXA TEST COMMAND
//
        if (msgContent.includes(`alexa test`)) {
            Game.test(message);
        }

        if (msgContent.includes(`alexa play`)) {
           Commands.play(message,msgContent);
        }
        
        if (msgContent.includes("alexa stfu") || msgContent.includes("alexa shut up") || msgContent.includes("alexa fuck off")) {
            Commands.stfu(message);
        }
        
        if (msgContent.includes("alexa buy")) {
            Commands.buy(message,client);
        }

        //
        // THAT'S SO SAD COMMAND, WHICH PROMPTS ALEXA TO ASK IF YOU WANT TO PLAY DESPACITO
        //
        if (msgContent.replace(/[o]/gi,"").includes("thats s sad") || msgContent.replace(/[o]/gi,"").includes("that is s sad") || msgContent.replace(/[o]/gi,"").includes("that is just s sad")) {
            Commands.thatsSoSad(message);
        }

        // DAD BOT COMMAND
        if (msgContent.startsWith("im ")) {
            Commands.dadBot(message,msgContent);
        }

        if (msgContent.startsWith("alexa fuck ea")) {
            message.channel.send(`EA bAd gErAlDo gOoD`);
        }

        if (msgContent.startsWith("alexa bliz")) {
            BlizzardCmd.test(message);
        }
    }
});

client.login(config.token);