const Discord = require('discord.js');
// const client = new Discord.Client();
// const config = require('./config.json');
// const user = new Discord.Message();
// const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.5 };
const ytSearch = require( 'yt-search' );
const SQLite = require("better-sqlite3");
const bannedChannelsSql = new SQLite('./bannedChannels.sqlite');
const embed = new Discord.RichEmbed();
// const bannedChannelsSet = new Set();
var disconnectTimer;

const Commands = {
    test: function(message) {
        message.channel.send("this is a test message");
    },

    help: function(message, msgContent) {
        const helpEmbed = new Discord.RichEmbed();
        if (msgContent.slice(-1) === "1" || msgContent === "alexa" || msgContent === "alexa help" || msgContent === "alexa commands") {
        	message.channel.send(helpEmbed
            	.setAuthor(`Alexa Commands - Page 1`)
            	.setTitle(`Use "Alexa help [page 1-4]" (e.g. "Alexa help 1")`)
            	.setDescription(`
\`\`\`css
Alexa play [song name]
\`\`\` 
Will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.
\`\`\`css
Alexa STFU
\`\`\` 
Will disconnect Alexa from the voice channel.
\`\`\`css
Alexa volume
\`\`\`
Will bring up the volume commands. \`Alexa volume down\` or \`Alexa volume up\` changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.
            	`)
			);
		} else if (msgContent.slice(-1) === "2") {
            message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 2`)
                .setTitle(`Use "Alexa help [page #]"`)
                .setDescription(`
FAIR WARNING: I'm still working on this bot and frequently reset the database, don't get too attached to your XP, level and pretend money.
\`\`\`css
Alexa profile
\`\`\`
Will show you your profile.
\`\`\`css
Alexa steal [@somebody]
\`\`\` 
Will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual.
\`\`\`css
Alexa flip
\`\`\`
Will flip a coin. You either win money or you don't.
                `)
            );
        } else if (msgContent.slice(-1) === "3") {
			message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 3`)
                .setTitle(`Use "Alexa help [page #]"`)
				.setDescription(`
\`\`\`css
Alexa WoW profile [realm name] [character name]
\`\`\`
Will bring up info about that World of Warcraft character.
\`\`\`css
Alexa give me a meme
\`\`\`
Will give you a random fresh meme from Reddit.
\`\`\`css
Alexa give me /r/[subreddit]
\`\`\`
Will give you a random top post of the day from that subreddit.
				`)
			);
		} else if (msgContent.slice(-1) === "4") {
			message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 4`)
                .setTitle(`Use "Alexa help [page #]"`)
				.setDescription(`
\`\`\`css
Alexa buy [something]
\`\`\`
Will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.
				`)
			);
		} else {message.channel.send("You may have typed something wrong or attempted to access a page that doesn't exist. Try again using `Alexa help [1-4]` (e.g. `Alexa help 1`).")}
    },

    volume: function(message) {
        const volumeEmbed = new Discord.RichEmbed();
        if (message.content.toLowerCase().includes("down") && !message.content.toLowerCase().includes("up")) {
            if (streamOptions.volume > 0.2) {
                streamOptions.volume = streamOptions.volume - 0.1;
                message.channel.send("Volume has been turned down for future songs");
            } else {message.channel.send("Volume is too low to be turned down further!")}
        }

        else if (message.content.toLowerCase().includes("up") && !message.content.toLowerCase().includes("down")) {
            if (streamOptions.volume < 0.99) {
                streamOptions.volume = streamOptions.volume + 0.1;
                message.channel.send("Volume has been turned up for future songs");
            } else {message.channel.send("Volume is too high to be turned up further!")}
        } else {
            message.channel.send(volumeEmbed
                .addField("Setting volume for the \"Alexa play\" command","\`Alexa volume down\` turns volume down 10% \n \`Alexa volume up\` turns volume up 10%")
                .setFooter(`The volume is currently at ${Math.floor(streamOptions.volume * 100)}%`));
        }
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
            .catch( (error) => {
                if (error) {
                setTimeout(() => {
                    message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
                }, 500),
                console.error,
                message.guild.voiceConnection.disconnect()
            }
            })
            console.log(msgContent);
        }
// ALEXA PLAY COMMAND RESPONSE
        if (typeof message.member.voiceChannel !== 'undefined') {
            let searchQuery = msgContent.slice(11);
            ytSearch(searchQuery, function (err,r ) {
                if (err) console.log(err)
                const videos = r.videos
                firstResult = videos[0]
                playSong("Let's get jiggy with it","https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif",`https://www.youtube.com/watch?v=${firstResult.videoId}`,`https://i.ytimg.com/vi/${firstResult.videoId}/default.jpg`,firstResult.title);
                let songDuration = (firstResult.duration.seconds + 4) * 1000;
                //let disconnectTimer;
                if (disconnectTimer) {
                    clearTimeout(disconnectTimer);
                }
                function autoDisconnect() {
                    disconnectTimer = setTimeout(() => {
                        if (message.guild.voiceConnection) {
                            message.guild.voiceConnection.disconnect();
                        }
                    }, songDuration);
                }
                autoDisconnect();
                //console.log(disconnectTimer);
            })
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
    thatsSoSad: function(message) {
        message.reply(`sorry you're sad. Would you like me to play Despacito?`);
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
                //console.log(collector)
                collector.on('collect', message => {
                    if (message.content.toLowerCase().includes("yes") || message.content.toLowerCase().includes("yeah") || message.content.toLowerCase().includes("ya") || message.content.toLowerCase().includes("sure")) {
                        collector.stop();
                        if (typeof message.member.voiceChannel !== 'undefined') {
                            collector.stop();
                            Commands.play(message,"alexa play despacito");
                        }
                        else {
                            collector.stop();
                            message.reply(`get in a voice channel, ya bonehead`);
                        }
                    } else if (message.content.toLowerCase().includes("no") || message.content.toLowerCase().includes("nah") || message.content.toLowerCase().includes("nope")) {
                        collector.stop();
                        message.channel.send("Okie dokie. Hope you feel better.");
                    }
                })
    },
    dadBot: function(message,msgContent) {
        const dadEmbed = new Discord.RichEmbed();
        //message.channel.send(`Hi, ${msgContent.slice(3)}, I'm Dad!`);
        message.channel.send(dadEmbed.setTitle(`Hi, ${msgContent.slice(3)}, I'm Dad!`).setThumbnail('https://i.imgur.com/H0ciQWN.png'));
	},
	
	getOut: function(message,msgContent) {
		const getChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE id = ?;")
		const setChannels = bannedChannelsSql.prepare("INSERT OR REPLACE INTO bannedChannels (id, guildId, channelId) VALUES (@id, @guildId, @channelId);")
		const channelId = msgContent.slice(19,-1);
		
		if (channelId.length !== 18) {
			message.channel.send(`You may have typed something wrong. Try again and remember to only use one channel at a time, and tag it using \`#\`.`)
		} else {
			var bannedChannelObj = {
				id: `${message.guild.id}-${channelId}`,
				guildId: message.guild.id,
				channelId: channelId
			}
			setChannels.run(bannedChannelObj);
		}
	}
};

module.exports = Commands