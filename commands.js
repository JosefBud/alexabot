const Discord = require('discord.js');
const client = new Discord.Client();
// const config = require('./config.json');
// const user = new Discord.Message();
// const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const ytSearch = require( 'yt-search' )
// const SQLite = require("better-sqlite3");
// const sql = new SQLite('./scores.sqlite');
const embed = new Discord.RichEmbed()

const Commands = {
    test: function(message) {
            message.channel.send("this is a test message");
    },
    play: function(message,msgContent) {
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
// ALEXA PLAY COMMAND RESPONSE
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
    },
    buy: function(message,client) {
// PULLS RANDOM MEMBER FROM THE SERVER/GUILD MEMBER LIST FOR USE WITH THE "ALEXA BUY" COMMAND
        let everyoneArray = message.guild.members.array();
        let randomMember = everyoneArray[Math.floor(Math.random() * everyoneArray.length)];
// ALEXA, BUY COMMAND WHICH USES THE RANDOM MEMBER
        client.fetchUser(randomMember).then(myUser => {message.reply(`your purchase was successful. The credit card charge has been applied to ${myUser.username}'s Amazon™ account.`)});
    },
    stfu: function(message) {
        if (message.guild.voiceConnection) {
            message.channel.send(`Well fine, fuck you too`);
            message.guild.voiceConnection.disconnect();
        } else {
            message.channel.send(`I'm not even doing anything, asshole`)
        }
    },
    dadBot: function(message,msgContent) {
        message.channel.send(`Hi, ${msgContent.slice(3)}, I'm Alexa!`);
    }
};

module.exports = Commands