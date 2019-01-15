const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const user = new Discord.Message();
const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
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
});

// checks for "alexa, play despacito" message and plays that shit, unless they're not in a voice channel
// USES STREAM INSTEAD OF FILE
client.on('message', message => {
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");
    if (!message.author.bot) {
        if (msgContent.includes(`alexa test`.toLowerCase())) {
            console.log(message.author);
        }
        //Alexa, play despacito command
        if (msgContent.includes(`alexa play despacito`.toLowerCase())) {
            if (!message.guild.voiceConnection) {
                if (typeof message.member.voiceChannel !== 'undefined') {
                    message.channel.send(embed.setAuthor(`Let's get jiggy with it, ${message.author.username}`).setImage("https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif"));
                    const channel = message.member.voiceChannel;
                    channel.join()
                    .then(connection => {
                        const stream = ytdl('https://www.youtube.com/watch?v=kJQP7kiw5Fk', { filter : 'audioonly' })
                        const dispatcher = connection.playStream(stream, streamOptions);}
                        )
                    .catch(console.error);
                    console.log(msgContent);
                }
                else {
                        message.reply(`get in a voice channel, ya bonehead`);
                }
            } 
            else {
                message.reply(`I'm already playing it, goofball`);
            }
        }
        // Alexa, stfu command
        if (msgContent.includes("alexa stfu".toLowerCase()) || msgContent.includes("alexa shut up".toLowerCase()) || msgContent.includes("alexa fuck off".toLowerCase())) {
            if (message.guild.voiceConnection) {
                message.channel.send(`Well fine, fuck you too`);
                message.guild.voiceConnection.disconnect();
            } else {
                message.channel.send(`I'm not even doing anything, asshole`)
            }
          }
        // Alexa, buy command
        if (msgContent.includes("alexa buy".toLowerCase())) {
            message.reply(`your purchase was successful. The credit card charge has been applied to Taydoge's Amazon™ account.`);
        }
        // That's so sad command
        if (msgContent.includes("thats so sad".toLowerCase()) || msgContent.includes("that is so sad".toLowerCase())) {
            message.reply(`sorry you're sad. Would you like me to play Despacito?`)
            .then(thatsSoSad = true);
        }
        // That's so sad REPLY commands
        // YES
        if (msgContent.includes("yes".toLowerCase()) || msgContent.includes("yeah".toLowerCase()) || msgContent.includes("ya".toLowerCase())) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                if (!message.guild.voiceConnection) {
                    if (typeof message.member.voiceChannel !== 'undefined') {
                        message.channel.send(embed.setAuthor(`Let's get jiggy with it, ${message.author.username}`).setImage("https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif"));
                        const channel = message.member.voiceChannel;
                        channel.join()
                        .then(connection => {
                            const stream = ytdl('https://www.youtube.com/watch?v=kJQP7kiw5Fk', { filter : 'audioonly' })
                            const dispatcher = connection.playStream(stream, streamOptions);}
                            )
                        .catch(console.error);
                        console.log(msgContent);
                        thatsSoSad = false;
                    }
                    else {
                            message.reply(`get in a voice channel, ya bonehead`);
                            thatsSoSad = false;
                    }
                } 
                else {
                    message.reply(`I'm already playing it, goofball`);
                    thatsSoSad = false;
                }
            }
        }
        // NO
        if (msgContent.includes("no".toLowerCase()) || msgContent.includes("nah".toLowerCase()) || msgContent.includes("nope".toLowerCase())) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                message.channel.send(`Okie dokie. Hope you feel better.`)
                thatsSoSad = false;
            }
        }
    }
});

/*
client.on('message', message => {
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");
    if (msgContent.includes("alexa play test".toLowerCase())) {
        if (!message.guild.voiceConnection) {
            if (typeof message.member.voiceChannel !== 'undefined') {
                message.reply(`Let's get jiggy with it.`);
                const channel = message.member.voiceChannel;
                channel.join()
                .then(connection => {
                    const stream = ytdl('https://www.youtube.com/watch?v=rzfmZC3kg3M', { filter : 'audioonly' })
                        .on("end", end => {
                            message.guild.voiceConnection.disconnect();
                        })
                    const dispatcher = connection.playStream(stream, streamOptions);}
                    )
                .catch(console.error);
            }
            else {
                    message.reply(`Get in a voice channel, ya bonehead`);
            }
        } 
        else {
            message.reply(`I'm already playing it, goofball`);
        }
    }
});
*/

var d = new Date();
console.log(d.getTime());
client.login(config.token);