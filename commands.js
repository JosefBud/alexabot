const Discord = require('discord.js');
// const client = new Discord.Client();
// const config = require('./config.json');
// const user = new Discord.Message();
// const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const ytSearch = require( 'yt-search' );
const SQLite = require("better-sqlite3");
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');
const serverVolumeSql = new SQLite('./db/serverVolume.sqlite');
const StockMarket = require('./stockMarket.js');
const Arrays = require('./arrays.js');
var alexaColor = "#31C4F3";
if (!servers) {var servers = {};}
if (!server) {var server = {queue: [], requester: []};}
if (!playReason) {var playReason = "";}
// const bannedChannelsSet = new Set();
var disconnectTimer;

const Commands = {
    test: function(message) {
        //Arrays.minesweeperFunction(message);
    },

    help: function(message, msgContent) {
        const helpEmbed = new Discord.RichEmbed();
        helpEmbed.setColor(alexaColor);
        if (msgContent.slice(-1) === "1" || msgContent === "alexa" || msgContent === "alexa help" || msgContent === "alexa commands") {
        	message.channel.send(helpEmbed
            	.setAuthor(`Alexa Commands - Page 1`)
            	.setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    **Alexa play [song name]** will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.
                    **Alexa queue [song name]** will queue up a song to play when the current one is finished.
                    **Alexa queue** will show the current queue of songs.
                    **Alexa clear queue** will clear out the current queue of songs.
                    **Alexa next** will play the next song in the queue.
                    **Alexa STFU** will disconnect Alexa from the voice channel.
                    **Alexa volume** will bring up the volume commands and current volume.
                    **Alexa volume [0-100]%** will change the volume to the number you set.
                    **Alexa volume down** or **Alexa volume up** changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.
            	`)
			);
		} else if (msgContent.slice(-1) === "2") {
            message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 2`)
                .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    __**Alexa Stock Market Game**__\n
                    **Alexa stocks** or **Alexa stocks help** will bring up this list of commands.
                    **Alexa stocks start** is the starting point. This will create a profile for you in the stock market and give you $50,000 to make your investments.
                    **Alexa stocks search [company name]** will provide the stock **symbol** for that company. This is important, because everything else relies on using stock symbols, **not** company names.
                    **Alexa stocks buy [quantity] [symbol]** will buy shares in the company.
                    **Alexa stocks sell [quantity] [symbol]** will sell shares back and return the money to your wallet.
                    **Alexa stocks profile** or **Alexa stocks portfolio** will show you your current holdings, both in your wallet and your shares.
                    **Alexa stocks price [symbol]** will show you the current price for shares of that company.
                    **Alexa stocks history [symbol]** will show you a detailed history for that company's stock.
                    **Alexa stocks leaderboard** will show you the current leaderboard for portfolio value.
                `)
            );
        } else if (msgContent.slice(-1) === "3") {
			message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 3`)
                .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    **Alexa profile** will show you your profile.
                    **Alexa steal [@somebody]** will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual.
                    **Alexa flip** will flip a coin. You either win money or you don't.
                    **Alexa vote** will provide the link to vote for Alexa on discordbots.org.
                    **Alexa get out of [#channel]** will stop Alexa from listening in the channel you specify.
                    **Alexa come back to [#channel]** will bring Alexa back to a channel she was kicked out of.
				`)
			);
		} else if (msgContent.slice(-1) === "4") {
			message.channel.send(helpEmbed
                .setAuthor(`Alexa Commands - Page 4`)
                .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    **Alexa WoW profile [realm name] [character name]** will bring up info about that World of Warcraft character.
                    **Alexa give me a meme** will give you a random fresh meme from Reddit.
                    **Alexa give me /r/[subreddit]** will give you a random top post of the day from that subreddit.
                    **Alexa buy [something]** will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.
				`)
			);
		} else if (msgContent === "alexa help stocks") {
            StockMarket.help(message);
        } else {
            message.channel.send("You may have typed something wrong or attempted to access a page that doesn't exist. Try again using `Alexa help [1-4]` (e.g. `Alexa help 1`).")
        }
    },

    volume: function(message) {
        const volumeEmbed = new Discord.RichEmbed();
        const serverVolume = serverVolumeSql.prepare("SELECT * FROM serverVolume WHERE guildId = ?").get(message.guild.id)
        const setServerVolume = serverVolumeSql.prepare("UPDATE serverVolume SET volume = @volume WHERE guildId = @guildId;")
        if (message.content.toLowerCase().includes("down") && !message.content.toLowerCase().includes("up")) {
            if (serverVolume.volume > 0.2) {
                serverVolume.volume = serverVolume.volume - 0.1;
                setServerVolume.run(serverVolume);
                message.channel.send("Volume has been turned down for future songs");
            } else {message.channel.send("Volume is too low to be turned down further!")}
        }

        else if (message.content.toLowerCase().includes("up") && !message.content.toLowerCase().includes("down")) {
            if (serverVolume.volume < 0.99) {
                serverVolume.volume = serverVolume.volume + 0.1;
                setServerVolume.run(serverVolume)
                message.channel.send("Volume has been turned up for future songs");
            } else {message.channel.send("Volume is too high to be turned up further!")}
        } 
        
        else if (parseInt(message.content.slice(13)) >= 0 && parseInt(message.content.slice(13)) <= 100) {
            let newVolume = Math.floor(parseInt(message.content.slice(13))) / 100;
            serverVolume.volume = newVolume;
            setServerVolume.run(serverVolume);
            message.channel.send(`Volume has been changed to ${newVolume * 100}% for future songs`);
            //console.log(newVolume);
        }
        
        else {
            message.channel.send(volumeEmbed
                .addField("Setting volume for the \"Alexa play\" command","\`Alexa volume down\` turns volume down 10% \n \`Alexa volume up\` turns volume up 10%")
                .setFooter(`The volume is currently at ${Math.floor(serverVolume.volume * 100)}%`));
        }
    },

    play: function(message,msgContent) {
		if (typeof message.member.voiceChannel !== 'undefined') {
            const embed = new Discord.RichEmbed();
            var searchQuery = msgContent.slice(11);
            if (searchQuery.includes("list=")) {
                message.channel.send("I don't support directly linking YouTube playlists yet, bb. Don't do me dirty like that.")
                return;
            }
			ytSearch(searchQuery, function (err,r ) {
				if (err) {
					console.log(err)
				}
				const videos = r.videos
                var firstResult = videos[0]
                console.log(firstResult);
                message.channel.send(embed
                    .setColor(alexaColor)
					.setAuthor(`Let's get jiggy with it, ${message.author.username}`)
					.setThumbnail("https://media.giphy.com/media/kLM9I1g8jsiAM/giphy.gif")
                    .setImage(`https://i.ytimg.com/vi/${firstResult.videoId}/mqdefault.jpg`)
                    .addField(`${firstResult.title} (${firstResult.timestamp})`,`https://www.youtube.com/watch?v=${firstResult.videoId}`)
					.setFooter(`${firstResult.views.toLocaleString()} views | Uploaded ${firstResult.ago}`));
					console.log(server.queue[0]);
                const channel = message.member.voiceChannel;
                const getServerVolume = serverVolumeSql.prepare("SELECT * FROM serverVolume WHERE guildId = ?").get(message.guild.id);
                if (!getServerVolume) {
                    streamOptions = {seek: 0, volume: 0.5};
                } else {
                    streamOptions = {seek: 0, volume: getServerVolume.volume};
                }
				channel.join()
					.then(connection => {
                        const stream = ytdl(`https://www.youtube.com/watch?v=${firstResult.videoId}`, { filter : 'audioonly' })
						const dispatcher = connection.playStream(stream, streamOptions);
						dispatcher.on("end", () => {
                            console.log(playReason);
                            if (playReason === "next") {
                                playReason = "";
                                return;
                            } else if (server.queue[0]) {
								Commands.play(message,`alexa play ${server.queue[0]}`)
                                server.queue.shift();
                                server.requester.shift();
							} else {
								//message.guild.voiceConnection.disconnect();
							}
						})
					})
					.catch( (error) => {
						if (error) {
							setTimeout(() => {
								message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
							}, 500),
							console.error,
							message.guild.voiceConnection.disconnect()
						}
					})
				/*
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
				*/
			})
		}
		else {
            if (server.queue[0]) {
                message.channel.send("There's still more songs in the queue but everyone left me so I'm just gonna... leave... now... I guess...")
                message.guild.voiceConnection.disconnect();
            } else {message.reply(`get in a voice channel, ya bonehead`);}
		}
	},
	
	queue: function(message) {
		if (!servers[message.guild.id]) {
			servers[message.guild.id] = {
                queue: [],
                requester: []
			};
        }
        server = servers[message.guild.id];
        
        if (message.content.toLowerCase() === "alexa queue") {
            const queueEmbed = new Discord.RichEmbed();
            queueEmbed.setTitle("Current song queue, sorted from next to last")
            server.queue.forEach((name, index) => {queueEmbed.addField(name, `requested by ${server.requester[index]}`, false)});
            message.channel.send(queueEmbed);
            return;
        }

        var songRequest = message.content.slice(12);
        if (songRequest.includes("list=")) {
            message.channel.send("I don't support directly linking YouTube playlists yet, bb. Don't do me dirty like that.");
            return;
        }
        server.queue.push(songRequest);
        server.requester.push(message.author.username);
        
		message.channel.send(`${message.author.username} has added *"${songRequest}"* to the queue **(warning: this feature is currently under construction)**`)
		console.log(server.queue);
	},

	next: function(message) {
		if (server.queue[0]) {
            playReason = "next";
			Commands.play(message,`alexa play ${server.queue[0]}`)
            server.queue.shift();
            server.requester.shift();
		} else {message.channel.send("There is no next song, silly gooth!")}
	},

    clearQueue: function(message) {
        if (server.queue[0]) {
            server.queue = [];
            server.requester = [];
            message.channel.send("The song queue has been cleared!")
        } else {message.channel.send("There is no song queue to clear!")}
    },

    stfu: function(message) {
        if (message.guild.voiceConnection) {
			server.queue = [];
            message.channel.send(`Well fine, fuck you too`);
			message.guild.voiceConnection.disconnect();
        } else {
            message.channel.send(`I'm not even doing anything, asshole`)
        }
	},
	
    buy: function(message,client) {
// PULLS RANDOM MEMBER FROM THE SERVER/GUILD MEMBER LIST FOR USE WITH THE "ALEXA BUY" COMMAND
        let everyoneArray = message.guild.members.array();
        let randomMember = everyoneArray[Math.floor(Math.random() * everyoneArray.length)];
// ALEXA, BUY COMMAND WHICH USES THE RANDOM MEMBER
        client.fetchUser(randomMember).then(myUser => {message.reply(`your purchase was successful. The credit card charge has been applied to ${myUser.username}'s Amazon™ account.`)});
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
        const channelId = msgContent.slice(19,-1);
		const getChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE id = ?;")
		const setChannels = bannedChannelsSql.prepare("INSERT OR REPLACE INTO bannedChannels (id, guildId, channelId) VALUES (@id, @guildId, @channelId);")
		
		if (channelId.length !== 18) {
			message.channel.send(`You may have typed something wrong. Try again and remember to only use one channel at a time, and tag it using \`#\`.`)
		} else {
			var bannedChannelObj = {
				id: `${message.guild.id}-${channelId}`,
				guildId: message.guild.id,
				channelId: channelId
			}
            setChannels.run(bannedChannelObj);
            message.channel.send(`Okay! I'll ignore your pleas for help in that channel. Use **Alexa come back to [channel]** to bring me back there`)
		}
    },
    
    comeBack: function(message,msgContent) {
        const channelId = msgContent.slice(21,-1);
		const getChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE id = ?;").get(`${message.guild.id}-${channelId}`)
		const setChannels = bannedChannelsSql.prepare("DELETE FROM bannedChannels WHERE id = ?;")
		
		if (channelId.length !== 18) {
			message.channel.send(`You may have typed something wrong. Try again and remember to only use one channel at a time, and tag it using \`#\`.`)
		} else if (!getChannels) {
            message.channel.send(`I'm already allowed in there, thilly!`)
        } else {
            setChannels.run(`${message.guild.id}-${channelId}`);
            message.channel.send(`Okay! I'll come back. But only because you said the magic words.`)
		}
    },
    
    minesweeper: async function (message) {
        var num_rows = 6;
        var num_cols = 6;
        var num_mines = 5;
        let finalGame = "**MINESWEEPER:**\n";
        var mines = new Array();
        for (var i = 0; i < num_mines; i++) {
            var new_mine = {};
            var new_mine_valid = false;
            while (!new_mine_valid) {
                new_mine.row = Math.floor((Math.random() * num_rows));
                new_mine.col = Math.floor((Math.random() * num_cols));
                new_mine_valid = true;
                for (j = 0; j < mines.length; j++) {
                    if ((mines[j].row == new_mine.row) && (mines[j].col == new_mine.col)) new_mine_valid = false;
                }
            }
            mines.push(new_mine);
        }
        console.log(mines);
        for (var r = 0; r < num_rows; r++) {
            for (var c = 0; c < num_cols; c++) {
                var contains_mine = false
                for (j = 0; j < mines.length; j++) {
                    if ((mines[j].row == r) && (mines[j].col == c)) contains_mine = true;
                }
                if (contains_mine) {
                    finalGame += ' ||:bomb:|| ';
                } else {
                    var number = 0;
                    for (var a = (r - 1); a <= (r + 1); a++) {
                        for (var b = (c - 1); b <= (c + 1); b++) {
                            for (j = 0; j < mines.length; j++) {
                                if ((mines[j].row == a) && (mines[j].col == b)) number++;
                            }
                        }
                    }
                    if (number == 0) {
                        finalGame += ' ||:zero:|| ';
                    } else {
                        let numberEmoji;
                        switch (number) {
                            case 1: numberEmoji = ":one:"; break;
                            case 2: numberEmoji = ":two:"; break;
                            case 3: numberEmoji = ":three:"; break;
                            case 4: numberEmoji = ":four:"; break;
                        };
                        finalGame += ` ||${numberEmoji}|| `;
                    }
                }
            }
            finalGame += "\n";
        }
        message.channel.send(finalGame);
    }
};

module.exports = Commands