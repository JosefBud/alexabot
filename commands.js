const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
// const config = require('./config.json');
// const user = new Discord.Message();
// const broadcast = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
const ytSearch = require( 'yt-search' );
const SQLite = require("better-sqlite3");
const ytlist = require("youtube-playlist");
const moment = require("moment");
const weather = require("weather-js");
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');
const serverVolumeSql = new SQLite('./db/serverVolume.sqlite');
const songQueue = new SQLite('./db/songQueue.sqlite');
const StockMarket = require('./stockMarket.js');
const Arrays = require('./arrays.js');
// let currentlyPlaying = require('./currentlyPlaying.json');
const alexaColor = "#31C4F3";
let endReason = "none";
// const bannedChannelsSet = new Set();
var disconnectTimer;

const Commands = {
    test: function(message) {
        return;
    },

    help: function(message, msgContent) {
        const helpEmbed = new Discord.RichEmbed();
        helpEmbed.setColor(alexaColor);
        if (msgContent.slice(-1) === "1" || msgContent === "alexa" || msgContent === "alexa help" || msgContent === "alexa commands") {
        	helpEmbed
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
                
            if (message.channel.type === "dm") {
                message.reply(helpEmbed);
                return;
            } else {
                message.channel.send(helpEmbed);
                return;
            }
		} else if (message.channel.type === "dm" && msgContent === "help") {
            helpEmbed
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

            message.reply(helpEmbed);
            return;
        } else if (msgContent.slice(-1) === "2") {
            helpEmbed
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

            if (message.channel.type === "dm") {
                message.reply(helpEmbed);
                return;
            } else {
                message.channel.send(helpEmbed);
                return;
            }
        } else if (msgContent.slice(-1) === "3") {
			helpEmbed
                .setAuthor(`Alexa Commands - Page 3`)
                .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    **Alexa what is the weather in [location]** will show you the weather for the location you ask for. You can use a city or a postal code, the latter will be more accurate.
                    **Alexa minesweeper** will generate a random game of Minesweeper, 6x6 with 5 bombs.
                    **Alexa profile** will show you your profile.
                    **Alexa steal [@somebody]** will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual.
                    **Alexa flip** will flip a coin. You either win money or you don't.
                    **Alexa vote** will provide the link to vote for Alexa on discordbots.org.
                    **Alexa get out of [#channel]** will stop Alexa from listening in the channel you specify.
                    **Alexa come back to [#channel]** will bring Alexa back to a channel she was kicked out of.
                `)
                
            if (message.channel.type === "dm") {
                message.reply(helpEmbed);
                return;
            } else {
                message.channel.send(helpEmbed);
                return;
            }
		} else if (msgContent.slice(-1) === "4") {
			helpEmbed
                .setAuthor(`Alexa Commands - Page 4`)
                .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
                .setDescription(`
                    **Alexa WoW profile [realm name] [character name]** will bring up info about that World of Warcraft character.
                    **Alexa give me a meme** will give you a random fresh meme from Reddit.
                    **Alexa give me /r/[subreddit]** will give you a random top post of the day from that subreddit.
                    **Alexa buy [something]** will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.
                `)
                
            if (message.channel.type === "dm") {
                message.reply(helpEmbed);
                return;
            } else {
                message.channel.send(helpEmbed);
                return;
            }
		} else if (msgContent === "alexa help stocks") {
            StockMarket.help(message);
        } else {
            if (message.channel.type === "dm") {
                message.reply("I can only give you the help menu. Try `Alexa help` or go through the help pages by using `Alexa help [1-4]` (e.g. `Alexa help 3`)")
                return;
            } else {
                message.channel.send("You may have typed something wrong or attempted to access a page that doesn't exist. Try again using `Alexa help [1-4]` (e.g. `Alexa help 3`).");
                return;
            }
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

    play: async function(message, msgContent, caseSensitiveContent) {
        async function playThis(message, video) {
            //endReason = "none";
            if (video.videoId.length !== 11) {
                message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                return;
            }

            const embed = new Discord.RichEmbed();
            embed
                .setColor(alexaColor)
                .setAuthor(`Let's get jiggy with it, ${message.author.username}`)
                .setThumbnail(`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`)
                .setImage(`https://media.giphy.com/media/8Bl2dceNUgY7sylmiU/giphy.gif`)
                .addField(`${video.name}`,`https://www.youtube.com/watch?v=${video.videoId}`)
                .setFooter(`If Alexa connected to the voice channel but isn't outputting any sound, just tell her to STFU and then try again. This is a known bug.`)
            message.channel.send(embed);

            console.log("playing:");
            console.log(video);
            const channel = message.member.voiceChannel;
            const getServerVolume = serverVolumeSql.prepare("SELECT * FROM serverVolume WHERE guildId = ?").get(message.guild.id);
            if (!getServerVolume) {
                streamOptions = {volume: 0.5};
            } else {
                streamOptions = {volume: getServerVolume.volume};
            }
            
            if (!message.guild.voiceConnection) {
                let currentlyPlaying = require('./currentlyPlaying.json');
                currentlyPlaying.total++;
                currentlyPlaying.servers.push(message.guild.id);
                fs.writeFile('./currentlyPlaying.json', JSON.stringify(currentlyPlaying), (err) => {
                    if (err) throw err;
                })
            }

            channel.join()
                .then(connection => {

                    let ytdlOptions = {};
                    if (video.seconds === 0) {
                        ytdlOptions = {quality: 'highestaudio'};
                        console.log(ytdlOptions);
                        console.log(video.seconds);
                    } else {
                        ytdlOptions = {quality: 'highestaudio'};
                        console.log(ytdlOptions);
                        console.log(video.seconds);
                    }
                    const stream = ytdl(`https://www.youtube.com/watch?v=${video.videoId}`, ytdlOptions)
                    const dispatcher = connection.playStream(stream, streamOptions);

                    dispatcher.on("end", () => {
                        console.log("dispatcher ended")
                        if (endReason === "stfu") {
                            endReason = "none";
                            console.log("stfu is the reason")
                            //message.guild.voiceConnection.disconnect();
                            return;
                        }

                        if (endReason === "next") {
                            endReason = "none";
                            console.log("next is the reason")
                            return;
                        }

                        if (endReason === "play") {
                            endReason = "none";
                            console.log("play is the reason")
                            return;
                        }

                        const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").get(message.guild.id);
                        console.log(getServerQueue);
                        if (getServerQueue) {
                            console.log("should be playing the next song")
                            Commands.play(message,`alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`, `alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`);
                            songQueue.prepare("DELETE FROM songQueue WHERE guildId = ? AND videoId = ?").run(message.guild.id, getServerQueue.videoId);
                            endReason = "none";
                            return;
                        } else {
                            message.guild.voiceConnection.disconnect();
                            let arrayNum = 0;
                            let currentlyPlaying = require('./currentlyPlaying.json');
                            currentlyPlaying.servers.forEach((element) => {
                                if (message.guild.id === element) {
                                    currentlyPlaying.servers.splice(arrayNum, 1);
                                    currentlyPlaying.total--;
                                } else {
                                    arrayNum++;
                                }
                            });
                            fs.writeFile('./currentlyPlaying.json', JSON.stringify(currentlyPlaying), (err) => {
                                if (err) throw err;
                            });
                        }
                    })
                })
                .catch( (error) => {
                    if (error) {
                        setTimeout(() => {
                            message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
                        }, 500);
                        console.log(error);
                        message.guild.voiceConnection.disconnect();
                        let arrayNum = 0;
                        let currentlyPlaying = require('./currentlyPlaying.json');
                        currentlyPlaying.servers.forEach((element) => {
                            if (message.guild.id === element) {
                                currentlyPlaying.servers.splice(arrayNum, 1);
                                currentlyPlaying.total--;
                            } else {
                                arrayNum++;
                            }
                        });
                        fs.writeFile('./currentlyPlaying.json', JSON.stringify(currentlyPlaying), (err) => {
                            if (err) throw err;
                        });
                    }
                })
        }

		if (typeof message.member.voiceChannel !== "undefined") {
            var searchQuery = msgContent.slice(11);

            //
            // PLAY BY USING A DIRECT LINK TO A YOUTUBE PLAYLIST, WHICH ADDS THE PLAYLIST TO THE SERVER QUEUE AND PLAYS THE VIDEO ID IN THE URL
            //
            if (msgContent.includes("list=")) {
                
                Commands.queue(message);

                if (msgContent.includes("?v=")) {
                    Commands.play(message, caseSensitiveContent.split("&list=")[0], caseSensitiveContent.split("&list=")[0]);

                    setTimeout(() => {
                        songQueue.prepare("DELETE FROM songQueue WHERE guildId = ? AND videoId = ?").run(message.guild.id, caseSensitiveContent.split("&list=")[0].split("?v=")[1])
                    }, 2000)
                    
                    return;
                } else {
                    return;
                }
            }

            //
            // PLAY BY USING A DIRECT LINK TO THE VIDEO
            //
            if (caseSensitiveContent.includes("?v=") || caseSensitiveContent.includes("youtu.be/")) {
                let getVideoId;
                if (caseSensitiveContent.includes("youtu.be/")) {
                    getVideoId = caseSensitiveContent.split("youtu.be/")[1];
                } else {
                    getVideoId = caseSensitiveContent.split("?v=")[1];
                }
    
                if (getVideoId.includes("&")) {
                    getVideoId = getVideoId.split("&")[0];
                }
    
                if (getVideoId.includes("?t=")) {
                    getVideoId = getVideoId.split("?t=")[0];
                }
                console.log(getVideoId)

                if (getVideoId.length !== 11) {
                    message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD");
                    return;
                }

                ytdl.getBasicInfo(`https://youtube.com/watch?v=${getVideoId}`, function (err, result) {
                    if (err) {
                        console.log(err);
                        message.channel.send("YouTube made an oopsie! For some reason the video you requested (either directly or in the queue) doesn't want to play. It might be deleted or region-locked to outside of the US.\nIf you're getting this message from a video in the queue, it should have continued on anyway.\nIf you're trying to play this video directly, sorry, dude. Pick another one.");
                        Commands.next(message);
                        return;
                    }
                    let videoObj = {
                        videoId: getVideoId,
                        name: result.player_response.videoDetails.title,
                        seconds: parseInt(result.player_response.videoDetails.lengthSeconds)
                    }
                    
                    if ((caseSensitiveContent.includes("fromalexaqueue")) === false) {
                        if (message.guild.voiceConnection) {
                            endReason = "play"
                        } else {endReason = "none"}
                    }

                    playThis(message, videoObj);
                    return;
                })
                return;
            }

            //
            // PLAY BY USING YOUTUBE SEARCH
            //
			ytSearch(searchQuery, function (err, result) {
				if (err) {
                    console.log(err)
                    message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
                    return;
                }
                
				const videos = result.videos
                var firstResult = videos[0]
                let videoObj = {
                    videoId: firstResult.videoId,
                    name: firstResult.title,
                    seconds: firstResult.seconds
                }

                if (firstResult.videoId.length !== 11) {
                    message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                    return;
                }
                
                if ((caseSensitiveContent.includes("fromalexaqueue")) === false) {
                    if (message.guild.voiceConnection) {
                        endReason = "play"
                    } else {endReason = "none"}
                }

                playThis(message, videoObj);
                return;
			})
		} else {
            message.reply(`get in a voice channel, ya bonehead`);
            return;
		}
	},
	
	queue: async function(message) {
        if (message.content.toLowerCase() === "alexa queue") {
            const queueEmbed = new Discord.RichEmbed();
            const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").all(message.guild.id);
            
            if (!getServerQueue[0]) {
                message.channel.send("There is no queue right now!");
                return;
            } else {
                let serverQueueList = "";
                let serverQueueListExtra = "";
                getServerQueue.forEach(element => {
                    if (serverQueueList.length < 1900) {
                        serverQueueList += `**${element.videoTitle}** (requested by ${element.requestedBy})\n`
                    } else {
                        if (serverQueueListExtra.length < 900) {
                            serverQueueListExtra += `**${element.videoTitle}** (requested by ${element.requestedBy})\n`
                        } else {
                            return;
                        }
                    }
                })
                queueEmbed
                    .setTitle("Current song queue, sorted from next to last")
                    .setDescription(serverQueueList)

                if (serverQueueListExtra.length > 0) {
                    queueEmbed
                        .addField("Continued...", serverQueueListExtra);
                }

                message.channel.send(queueEmbed);
                return;
            }
        }

        let songRequest = message.content.slice(12);
        const setServerQueue = songQueue.prepare("INSERT OR REPLACE INTO songQueue (guildId, videoId, videoTitle, videoUploader, videoLength, requestedBy, sortOrder) VALUES (@guildId, @videoId, @videoTitle, @videoUploader, @videoLength, @requestedBy, @sortOrder)");
        //let firstResult;

        //
        // CHECK IF IT'S A YOUTUBE PLAYLIST
        //
        if (songRequest.includes("list=")) {
            let listId = songRequest.split("list=")[1];
            
            if (listId.includes("&")) {
                listId = listId.split("&")[0];
            }

            ytlist(`https://www.youtube.com/playlist?list=${listId}`, ['id', 'name'])
                .then(playlist => {
                    if (!playlist.data.playlist[0]) {
                        message.channel.send("Oh noes, something went wrong. It looks like that playlist doesn't exist! If it does exist and this is a bug, please report it on the Alexa Discord server here: https://discord.gg/PysGrtD");
                        return;
                    }
                    
                    message.channel.send("Adding to queue...");
                    const getCurrentSort = songQueue.prepare("SELECT sortOrder FROM songQueue WHERE guildId = ? ORDER BY sortOrder DESC").get(message.guild.id)
                    let sortOrder = 0;

                    if (getCurrentSort) {
                        sortOrder = getCurrentSort + 1;
                    }
                    //
                    // ITERATE THROUGH EACH ENTRY IN THE PLAYLIST ARRAY AND ADD IT TO THE SERVER'S QUEUE DB
                    //
                    playlist.data.playlist.forEach(video => {
                        
                        let addToSongQueue = {
                            guildId: message.guild.id,
                            videoId: video.id,
                            videoTitle: video.name,
                            videoUploader: "",
                            videoLength: 1,
                            requestedBy: message.author.username,
                            sortOrder: sortOrder + 1
                        }
                        
                        setServerQueue.run(addToSongQueue);
                        sortOrder++;
                        //
                        // IF IT'S ADDED THE LAST VIDEO, PULL THE SERVER'S QUEUE DB AND SEND IT IN AN EMBED
                        // FOR SOME REASON PUTTING THIS CODE OUTSIDE OF THE FOREACH FUNCTION CAUSED IT TO RUN BEFORE THE FOREACH FUNCTION WAS OVER
                        // ADDING 'AWAIT' BEFORE YTLIST FUNCTION AND PUTTING THE DB PULL & EMBED AFTER THE 'AWAIT YTLIST' FUNCTION DIDN'T HELP EITHER
                        // AND I'M TOO MUCH OF A JAVASCRIPT NEWB TO FIGURE OUT WHY
                        //
                        if (video.id === playlist.data.playlist[(playlist.data.playlist.length - 1)].id) {
                            const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").all(message.guild.id);
                            
                            if (getServerQueue[0]) {
                                let queueEmbed = new Discord.RichEmbed();
                                let serverQueueList = "";
                                let serverQueueListExtra = "";
                                getServerQueue.forEach(element => {
                                    if (serverQueueList.length < 1900) {
                                        serverQueueList += `**${element.videoTitle}** (requested by ${element.requestedBy})\n`
                                    } else {
                                        if (serverQueueListExtra.length < 900) {
                                            serverQueueListExtra += `**${element.videoTitle}** (requested by ${element.requestedBy})\n`
                                        } else {
                                            return;
                                        }
                                    }
                                })
                                queueEmbed
                                    .setTitle(`${message.author.username} has added the following songs to the queue:`)
                                    .setDescription(serverQueueList)
                                    .setFooter("Please note, I can only add a maximum of 100 songs from a YouTube playlist!")

                                if (serverQueueListExtra.length > 0) {
                                    queueEmbed
                                        .addField("Continued...", serverQueueListExtra);
                                }

                                message.channel.send(queueEmbed);
                                return;
                            } else {
                                return;
                            }
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                    message.channel.send("Oh noes, something went wrong. It looks like that playlist doesn't exist! If it does exist and this is a bug, please report it on the Alexa Discord server here: https://discord.gg/PysGrtD")
                    return;
                })
            return;
        }

        if (songRequest.includes("?v=") || songRequest.includes("youtu.be/")) {
            let videoId;
            if (songRequest.includes("youtu.be/")) {
                videoId = songRequest.split("youtu.be/")[1];
            } else {
                videoId = songRequest.split("?v=")[1];
            }

            if (videoId.includes("&")) {
                videoId = videoId.split("&")[0];
            }

            if (videoId.includes("?t=")) {
                videoId = videoId.split("?t=")[0];
            }

            if (videoId.length !== 11) {
                message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                return;
            }
            
            ytdl.getBasicInfo(`https://youtube.com/watch?v=${videoId}`, function (err, result) {
                if (err) {
                    console.log(err);
                    message.channel.send("Oh noes, something went wrong. It looks like that video doesn't exist! If it does exist and this is a bug, please report it on the Alexa Discord server here: https://discord.gg/PysGrtD");
                    return;
                }

                let lastVideo = songQueue.prepare("SELECT sortOrder FROM songQueue WHERE guildId = ? ORDER BY sortOrder DESC").get(message.guild.id)
                if (!lastVideo) {
                    lastVideo = 0;
                }

                let addToSongQueue = {
                    guildId: message.guild.id,
                    videoId: result.player_response.videoDetails.videoId,
                    videoTitle: result.player_response.videoDetails.title,
                    videoUploader: result.player_response.videoDetails.author,
                    videoLength: parseInt(result.player_response.videoDetails.lengthSeconds),
                    requestedBy: message.author.username,
                    sortOrder: lastVideo + 1
                }
                

                setServerQueue.run(addToSongQueue);
                message.channel.send(`${message.author.username} has added **"${result.player_response.videoDetails.title}"** to the queue`)
            })
            return;
        }
        
        ytSearch(songRequest, function (err, r) {
            if (err) {
                console.log(err)
                message.channel.send("Oh noes, something went wrong. Sorry! If you feel like it, report this bug on the Alexa Discord server: https://discord.gg/PysGrtD");
            }
            const results = r.videos;
            let firstResult = results[0];

            let lastVideo = songQueue.prepare("SELECT sortOrder FROM songQueue WHERE guildId = ? ORDER BY sortOrder DESC").get(message.guild.id)
            
            if (!lastVideo) {
                lastVideo = {sortOrder: 0};
            }

            if (firstResult.videoId.length !== 11) {
                message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                return;
            }

            let addToSongQueue = {
                guildId: message.guild.id,
                videoId: firstResult.videoId,
                videoTitle: firstResult.title,
                videoUploader: firstResult.author.name,
                videoLength: firstResult.seconds,
                requestedBy: message.author.username,
                sortOrder: lastVideo.sortOrder + 1
            };
            setServerQueue.run(addToSongQueue);
		    message.channel.send(`${message.author.username} has added **${firstResult.title}** to the queue`);
        })
	},

	next: function(message) {
        const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").get(message.guild.id);
		if (getServerQueue) {
            endReason = "next";
            Commands.play(message,`alexa play https://youtu.be/${getServerQueue.videoId}`, `alexa play https://youtu.be/${getServerQueue.videoId}`)
            songQueue.prepare("DELETE FROM songQueue WHERE guildId = ? AND videoId = ?").run(message.guild.id, getServerQueue.videoId);
            setTimeout(() => {endReason = "none";}, 1000)
		} else {message.channel.send("There is no next song, silly gooth!")}
	},

    clearQueue: function(message) {
        const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ?").all(message.guild.id);
        
        if (getServerQueue[0]) {
            songQueue.prepare("DELETE FROM songQueue WHERE guildId = ?").run(message.guild.id);
            message.channel.send("The song queue has been cleared!");
        } else {message.channel.send("There is no song queue to clear!");};
    },

    stfu: function(message) {
        if (message.guild.voiceConnection) {
            endReason = "stfu";
            message.channel.send(`Well fine, fuck you too`);
            message.guild.voiceConnection.disconnect();
            let arrayNum = 0;
            let currentlyPlaying = require('./currentlyPlaying.json');
            currentlyPlaying.servers.forEach((element) => {
                if (message.guild.id === element) {
                    currentlyPlaying.servers.splice(arrayNum, 1);
                    currentlyPlaying.total--;
                } else {
                    arrayNum++;
                }
            });
            fs.writeFile('./currentlyPlaying.json', JSON.stringify(currentlyPlaying), (err) => {
                if (err) throw err;
            });
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
                            Commands.play(message, "alexa play despacito", "alexa play despacito");
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
    },

    whatIsWeather: async function(message) {
        let weatherLocation;

        async function findWeather(message, weatherLocation) {
            weather.find({search: weatherLocation, degreeType: 'F'}, (err, result) => {
                if (err) {
                    console.log(err)
                    message.channel.send("Something went wrong there. Are you sure you typed everything correctly?")
                    return;
                }
                const weatherEmbed = new Discord.RichEmbed();
                let celsius = Math.round((parseInt(result[0].current.temperature) - 32) * 5 / 9)
                let feelsLikeCelsius = Math.round((parseInt(result[0].current.feelslike) - 32) * 5 / 9)
                let zipCode;
                if (result[0].location.zipcode) {
                    zipCode = "(" + result[0].location.zipcode + ")"
                } else {zipCode = ""}
    
                weatherEmbed
                    .setAuthor(`${result[0].location.name} ${zipCode}`, result[0].current.imageUrl)
                    .setDescription(`**Current temperature:** ${result[0].current.temperature}°F (${celsius}°C)\n**Feels like:** ${result[0].current.feelslike}°F (${feelsLikeCelsius}°C)\n**Skies:** ${result[0].current.skytext}\n**Humidity:** ${result[0].current.humidity}%\n**Wind:** ${result[0].current.winddisplay}`)
                    .setThumbnail(result[0].current.imageUrl)
                    .setFooter(`As of ${result[0].current.observationtime}`)
    
                message.channel.send(weatherEmbed)
            })
        }

        if (message.content.toLowerCase() === "alexa what is the weather" || message.content.toLowerCase() === "alexa how is the weather") {
            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 })
            message.channel.send("What location do you want the weather for? You can either tell me the city or postal code (the latter will be more accurate)")
            collector.on('collect', message => {
                findWeather(message, message.content);
                collector.stop()
                return;
            })

            collector.on("end", (collected,reason) => {
                if (reason === 'time') {
                    message.channel.send("You took too much time to respond!");
                } else {return;}
            })
        } else if (message.content.toLowerCase().startsWith("alexa what is the weather in")) {
            weatherLocation = message.content.slice(29);
            findWeather(message, weatherLocation);
            return;
        } else if (message.content.toLowerCase().startsWith("alexa how is the weather in")) {
            weatherLocation = message.content.slice(28);
            findWeather(message, weatherLocation);
            return;
        }
    }
};

module.exports = Commands