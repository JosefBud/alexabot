const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const ytSearch = require( 'yt-search' )
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

//
client.on('message', message => {
    // REMOVES SPECIFIC COMMON PUNCTUATION, LIKE SAYING "ALEXA, PLAY X" OR "ALEXA PLAY X."
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

    // PULLS RANDOM MEMBER FROM THE SERVER/GUILD MEMBER LIST FOR USE WITH THE "ALEXA BUY" COMMAND
    let everyoneArray = message.guild.members.array();
    let randomMember = everyoneArray[Math.floor(Math.random() * everyoneArray.length)];

    // FUNCTION FOR PLAYING A SONG, ALL THREE OF THE FUNCTION ARGUMENTS ARE STRINGS
    function playSong(title,imageUrl,youtubeUrl) {
        message.channel.send(embed.setAuthor(`${title}, ${message.author.username}`).setThumbnail(imageUrl));
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
        // ALEXA TEST COMMAND
        if (msgContent.includes(`alexa test`.toLowerCase())) {
            let searchQuery = msgContent.slice(11);
            ytSearch(searchQuery, function (err,r ) {
                if (err) throw err
                const videos = r.videos
                const firstResult = videos[0].url
                message.channel.send(`https://www.youtube.com${firstResult}`)
                message.channel.send(searchQuery)
              } )
        }
        //ALEXA PLAY COMMAND
       if (msgContent.includes(`alexa play`.toLowerCase())) {
        //if (!message.guild.voiceConnection) {
            if (typeof message.member.voiceChannel !== 'undefined') {
                let searchQuery = msgContent.slice(11);
                ytSearch(searchQuery, function (err,r ) {
                if (err) throw err
                const videos = r.videos
                firstResult = videos[0].url
                playSong("Let's get jiggy with it","https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif",`https://www.youtube.com${firstResult}`);
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
        if (msgContent.includes(`alexa play shooting stars`.toLowerCase())) {
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
        // ALEXA, STFU COMMAND FOR ENDING THE STREAM
        if (msgContent.includes("alexa stfu".toLowerCase()) || msgContent.includes("alexa shut up".toLowerCase()) || msgContent.includes("alexa fuck off".toLowerCase())) {
            if (message.guild.voiceConnection) {
                message.channel.send(`Well fine, fuck you too`);
                message.guild.voiceConnection.disconnect();
            } else {
                message.channel.send(`I'm not even doing anything, asshole`)
            }
          }
        // ALEXA, BUY COMMAND WHICH USES THE RANDOM MEMBER
        if (msgContent.includes("alexa buy".toLowerCase())) {
            client.fetchUser(randomMember).then(myUser => {message.reply(`your purchase was successful. The credit card charge has been applied to ${myUser.username}'s Amazon™ account.`)})
            //message.reply(`your purchase was successful. The credit card charge has been applied to ${poorSoul}'s Amazon™ account.`);
        }
        // THAT'S SO SAD COMMAND, WHICH PROMPTS ALEXA TO ASK IF YOU WANT TO PLAY DESPACITO
        if (msgContent.includes("thats so sad".toLowerCase()) || msgContent.includes("that is so sad".toLowerCase())) {
            message.reply(`sorry you're sad. Would you like me to play Despacito?`)
            .then(thatsSoSad = true);
        }
        // That's so sad REPLY commands
        // YES
        if (msgContent.includes("yes".toLowerCase()) || msgContent.includes("yeah".toLowerCase()) || msgContent.includes("ya".toLowerCase())) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                //if (!message.guild.voiceConnection) {
                    if (typeof message.member.voiceChannel !== 'undefined') {
                        playSong("Let's get jiggy with it","https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif","https://www.youtube.com/watch?v=kJQP7kiw5Fk");
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
        if (msgContent.includes("no".toLowerCase()) || msgContent.includes("nah".toLowerCase()) || msgContent.includes("nope".toLowerCase())) {
            console.log(thatsSoSad);
            if (thatsSoSad === true) {
                message.channel.send(`Okie dokie. Hope you feel better.`)
                thatsSoSad = false;
            }
        }
    }
});

var d = new Date();
console.log(d.getTime());
client.login(config.token);