const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytSearch = require( 'yt-search' );
const ytlist = require("youtube-playlist");
const SQLite = require("better-sqlite3");
const songQueue = new SQLite('./db/songQueue.sqlite');

async function musicQueue(message) {
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
}

module.exports = musicQueue;