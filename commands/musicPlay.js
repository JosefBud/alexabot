const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const winston = require('winston');
const SQLite = require("better-sqlite3");
const serverVolumeSql = new SQLite('./db/serverVolume.sqlite');
const songQueue = new SQLite('./db/songQueue.sqlite');
const alexaColor = "#31C4F3";
let endReason = "none";

const featureTracker = require('../featureTracker.js');
const musicQueue = require('./musicQueue.js');
const musicPause = require('./musicPause.js');
const musicResume = require('./musicResume.js');

async function getEndReason() {
    return endReason;
}

async function setEndReason(newEndReason) {
    endReason = newEndReason;
}

async function musicPlay(message, msgContent, caseSensitiveContent, client) {
    // avoiding circular dependency, the lazy way... may have to combine these functions into one file again
    const musicNext = require('./musicNext.js');
    const musicStfu = require('./musicStfu.js');

    async function playThis(message, video) {
        //endReason = "none";
        if (video.videoId.length !== 11) {
            message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
            return;
        }

        // const dancingDaddy = "https://media.giphy.com/media/8Bl2dceNUgY7sylmiU/giphy.gif"
        const embed = new Discord.RichEmbed();
        embed
            .setColor(alexaColor)
            .setAuthor(`Let's get jiggy with it, my dudes`)
            .setThumbnail(`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`)
            .addField(`${video.name}`, `https://www.youtube.com/watch?v=${video.videoId}`)
            .setFooter(`If Alexa connected to the voice channel but isn't outputting any sound, just tell her to STFU and then try again. This is a known bug.`)

        message.channel.send(embed)
            .then(newMessage => {
                newMessage.react('▶')
                    .then(() => {
                        newMessage.react('⏸')
                            .then(() => {
                                newMessage.react('⏭')
                                    .then(() => {
                                        newMessage.react('⏹')
                                    })
                            })
                    });
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '▶' && user.id !== client.user.id ||
                        reaction.emoji.name === '⏸' && user.id !== client.user.id ||
                        reaction.emoji.name === '⏭' && user.id !== client.user.id ||
                        reaction.emoji.name === '⏹' && user.id !== client.user.id;
                }
                let emojiPause = new Discord.ReactionCollector(newMessage, filter, {
                    time: 600000
                })

                emojiPause.on('collect', (reaction, reactionCollector) => {
                    if (reaction.emoji.name === '⏸') {
                        let reactorUsername = reaction.users.filter(user => user.id !== client.user.id).array()[0].username;
                        musicPause(message, client, reactorUsername);
                        featureTracker("emojiPause");
                    } else if (reaction.emoji.name === '▶') {
                        let reactorUsername = reaction.users.filter(user => user.id !== client.user.id).array()[0].username;
                        musicResume(message, client, reactorUsername);
                        featureTracker("emojiPlay");
                    } else if (reaction.emoji.name === '⏭') {
                        let reactorUsername = reaction.users.filter(user => user.id !== client.user.id).array()[0].username;
                        musicNext(message, client, reactorUsername);
                        featureTracker("emojiNext");
                    } else if (reaction.emoji.name === '⏹') {
                        let reactorUsername = reaction.users.filter(user => user.id !== client.user.id).array()[0].username;
                        musicStfu(message, reactorUsername);
                        featureTracker("emojiStop");
                    }
                })
            })

        const musicLog = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({
                    filename: './logs/alexaMusic.log'
                })
            ]
        })

        musicLog.log({
            level: 'info',
            guildName: message.guild.name,
            username: [message.author.username],
            videoName: video.name,
            videoId: video.videoId,
            playOrStop: 'play',
            endReason: null
        })

        const channel = message.member.voiceChannel;
        const getServerVolume = serverVolumeSql.prepare("SELECT * FROM serverVolume WHERE guildId = ?").get(message.guild.id);
        if (!getServerVolume) {
            streamOptions = {
                volume: 0.5
            };
        } else {
            streamOptions = {
                volume: getServerVolume.volume
            };
        }

        if (!message.guild.voiceConnection) {
            let currentlyPlaying = require('../currentlyPlaying.json');
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
                    ytdlOptions = {
                        quality: 'highestaudio'
                    };
                    console.log(ytdlOptions);
                    console.log(video.seconds);
                } else {
                    ytdlOptions = {
                        quality: 'highestaudio'
                    };
                    console.log(ytdlOptions);
                    console.log(video.seconds);
                }
                const stream = ytdl(`https://www.youtube.com/watch?v=${video.videoId}`, ytdlOptions)
                const dispatcher = connection.playStream(stream, streamOptions);

                const checkIfAlone = setInterval(() => {
                    const notAlone = dispatcher.player.voiceConnection.channel.members.array()[1];
                    if (!notAlone) {
                        endReason = "alone";
                        message.channel.send("Nobody is in the voice channel anymore, so I'm just gonna... make.. my.. way.. out of here...")
                        connection.disconnect();
                        return;
                    }
                }, 5000)

                dispatcher.on("end", () => {
                    const fullUserArray = dispatcher.player.voiceConnection.channel.members.array();
                    const usernameArray = [];
                    fullUserArray.forEach((element) => {
                        usernameArray.push(element.user.username);
                    })

                    musicLog.log({
                        level: 'info',
                        guildName: dispatcher.player.voiceConnection.channel.guild.name,
                        username: usernameArray,
                        videoName: null,
                        videoId: null,
                        playOrStop: 'stop',
                        endReason: endReason
                    })

                    clearInterval(checkIfAlone);

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

                    if (endReason === "alone") {
                        endReason = "none";
                        console.log("alone is the reason");
                        return;
                    }

                    const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").get(message.guild.id);
                    console.log(getServerQueue);
                    if (getServerQueue) {
                        console.log("should be playing the next song")
                        musicPlay(message, `alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`, `alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`, client);
                        songQueue.prepare("DELETE FROM songQueue WHERE guildId = ? AND videoId = ?").run(message.guild.id, getServerQueue.videoId);
                        endReason = "none";
                        return;
                    } else {
                        message.guild.voiceConnection.disconnect();
                        let arrayNum = 0;
                        let currentlyPlaying = require('../currentlyPlaying.json');
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
            .catch((error) => {
                if (error) {
                    setTimeout(() => {
                        message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
                    }, 500);
                    console.log(error);
                    message.guild.voiceConnection.disconnect();
                    let arrayNum = 0;
                    let currentlyPlaying = require('../currentlyPlaying.json');
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

            musicQueue(message);

            if (msgContent.includes("?v=")) {
                musicPlay(message, caseSensitiveContent.split("&list=")[0], caseSensitiveContent.split("&list=")[0], client);

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
                    musicNext(message, client);
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
                    } else {
                        endReason = "none"
                    }
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
            let firstResult = videos[0]
            let videoObj;
            if (firstResult) {
                videoObj = {
                    videoId: firstResult.videoId,
                    name: firstResult.title,
                    seconds: firstResult.seconds
                }
            } else {
                message.channel.send("Seems like there's no videos by that name. Try again with a different search term.");
                return;
            }

            if (firstResult.videoId.length !== 11) {
                //message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                firstResult = videos[1];
                if (firstResult) {
                    videoObj = {
                        videoId: firstResult.videoId,
                        name: firstResult.title,
                        seconds: firstResult.seconds
                    }
                }

                if (firstResult.videoId.length !== 11) {
                    message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD");
                    return;
                }
            }

            console.log(videoObj);
            if ((caseSensitiveContent.includes("fromalexaqueue")) === false) {
                if (message.guild.voiceConnection) {
                    endReason = "play"
                } else {
                    endReason = "none"
                }
            }

            playThis(message, videoObj);
            return;
        })
    } else {
        message.reply(`get in a voice channel, ya bonehead`);
        return;
    }
}

module.exports = {
    getEndReason,
    setEndReason,
    musicPlay
};