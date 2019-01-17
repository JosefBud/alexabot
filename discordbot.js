const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const ytSearch = require( 'yt-search' )
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
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

client.on("ready", () => {

  });
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

//
client.on('message', message => {
    // REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY X" OR "ALEXA PLAY X."
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

    // PULLS RANDOM MEMBER FROM THE SERVER/GUILD MEMBER LIST FOR USE WITH THE "ALEXA BUY" COMMAND
    let everyoneArray = message.guild.members.array();
    let randomMember = everyoneArray[Math.floor(Math.random() * everyoneArray.length)];

    // FUNCTION FOR PLAYING A SONG, ALL THREE OF THE FUNCTION ARGUMENTS ARE STRINGS
    function playSong(title,imageUrl,youtubeUrl,youtubeThumb,youtubeTitle) {
        message.channel.send(embed
            .setAuthor(`${title}, ${message.author.username}`)
            .setThumbnail(imageUrl)
            .setImage(youtubeThumb)
            .setFooter(youtubeTitle));
        const channel = message.member.voiceChannel;
        channel.join()
        .then(connection => {
            const stream = ytdl(youtubeUrl, { filter : 'audioonly' })
            const dispatcher = connection.playStream(stream, streamOptions);}
            )
        .catch(console.error);
        console.log(msgContent);
    }

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
        // ALEXA TEST COMMAND
        //
        if (msgContent.includes(`alexa test`)) {
            
        }
        if (msgContent.includes(`alexa points`)) {
              message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
              console.log(score)
        }
        //
        // ALEXA PLAY COMMAND
        //
       if (msgContent.includes(`alexa play`)) {
        //if (!message.guild.voiceConnection) {
            if (typeof message.member.voiceChannel !== 'undefined') {
                let searchQuery = msgContent.slice(11);
                ytSearch(searchQuery, function (err,r ) {
                if (err) throw err
                const videos = r.videos
                firstResult = videos[0]
                playSong("Let's get jiggy with it","https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif",`https://www.youtube.com/watch?v=${firstResult.videoId}`,`https://i.ytimg.com/vi/${firstResult.videoId}/default.jpg`,firstResult.title);
                console.log(firstResult)
                } )
            }
            else {
                    message.reply(`get in a voice channel, ya bonehead`);
            }
        //} 
        /*else {
            message.reply(`I'm already playing it, goofball`);
        }*/
    }
        /*
        //Alexa, play shooting stars command
        if (msgContent.includes(`alexa play shooting stars`)) {
            if (!message.guild.voiceConnection) {
                if (typeof message.member.voiceChannel !== 'undefined') {
                    playSong("I've fallen and I can't get up","https://thumbs.gfycat.com/PowerfulViciousBangeltiger-size_restricted.gif","https://www.youtube.com/watch?v=feA64wXhbjo")
                }
                else {
                        message.reply(`get in a voice channel, ya bonehead`);
                }
            } 
            else {
                message.reply(`I'm already playing it, goofball`);
            }
        }
        */

        //
        // ALEXA, STFU COMMAND FOR ENDING THE STREAM
        //
        if (msgContent.includes("alexa stfu") || msgContent.includes("alexa shut up") || msgContent.includes("alexa fuck off")) {
            if (message.guild.voiceConnection) {
                message.channel.send(`Well fine, fuck you too`);
                message.guild.voiceConnection.disconnect();
            } else {
                message.channel.send(`I'm not even doing anything, asshole`)
            }
          }
        
        //
        // ALEXA, BUY COMMAND WHICH USES THE RANDOM MEMBER
        //
        if (msgContent.includes("alexa buy")) {
            client.fetchUser(randomMember).then(myUser => {message.reply(`your purchase was successful. The credit card charge has been applied to ${myUser.username}'s Amazon™ account.`)})
            //message.reply(`your purchase was successful. The credit card charge has been applied to ${poorSoul}'s Amazon™ account.`);
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
            message.channel.send(`Hi, ${msgContent.slice(3)}, I'm Alexa!`);
        }
    }
});

var d = new Date();
console.log(d.getTime());
client.login(config.token);