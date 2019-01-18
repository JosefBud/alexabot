const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const Commands = require('./commands.js');
/*
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : config.hostname,
  port     : config.port,
  user     : config.user,
  password : config.password,
  database : config.database,
  charset : 'utf8mb4'
});
*/

const embed = new Discord.RichEmbed()
//.setTitle("This is your title, it can hold 256 characters")*/
//.setAuthor(`Let's get jiggy with it, ${user.author}`/*, "https://i.imgur.com/lm8s41J.png"*/)
//.setColor(0x00AE86)
//.setDescription("This is the main body of text, it can hold 2048 characters.")
//.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
//.setImage("https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif")
//.setThumbnail("https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif")
//.setTimestamp()
//.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
//.addField("This is a field title, it can hold 256 characters",
//  "This is a field value, it can hold 1024 characters.")
//.addField("Inline Field", "They can also be inline.", true)
//.addBlankField(true)
//.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);*/
var thatsSoSad = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.debug);

    // Check if the table "points" exists.
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
    }

    // And then we have two prepared statements to get and set the score data.
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?;");
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.on('message', message => {
// REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY ____" OR "ALEXA PLAY ____."
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

// NOT-BOT CHECK
    if (!message.author.bot) {
        let score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
            score = {
              id: `${message.guild.id}-${message.author.id}`,
              user: message.author.id,
              guild: message.guild.id,
              points: 0,
              level: 1
            }
        }
        score.points++;
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if(score.level < curLevel) {
        score.level++;
        //message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
        client.setScore.run(score);
    
//
// ALEXA POINTS / SQL TEST
//
        if (msgContent.includes(`alexa points`)) {
            message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
            console.log(score)
        }
//
// ALEXA TEST COMMAND
//
        if (msgContent.includes(`alexa test`)) {
            Commands.test(message);
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
            message.reply(`sorry you're sad. Would you like me to play Despacito?`)
            .then(thatsSoSad = true);
        }

        // That's so sad REPLY commands
        // YES
        if (msgContent.includes("yes") || msgContent.includes("yeah") || msgContent.includes("ya")) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                //if (!message.guild.voiceConnection) {
                    if (typeof message.member.voiceChannel !== 'undefined') {
                        playSong("Let's get jiggy with it","https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif","https://www.youtube.com/watch?v=kJQP7kiw5Fk","","");
                        thatsSoSad = false;
                    }
                    else {
                            message.reply(`get in a voice channel, ya bonehead`);
                            thatsSoSad = false;
                    }
                //} 
                /*else {
                    message.reply(`I'm already playing it, goofball`);
                    thatsSoSad = false;
                }*/
            }
        }
        // NO
        if (msgContent.includes("no") || msgContent.includes("nah") || msgContent.includes("nope")) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                message.channel.send(`Okie dokie. Hope you feel better.`)
                thatsSoSad = false;
            }
        }

        // DAD BOT COMMAND
        if (msgContent.startsWith("im ")) {
            Commands.dadBot(message,msgContent);
        }
    }
});

var d = new Date();
console.log(d.getTime());
client.login(config.token);