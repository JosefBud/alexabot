const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ytSearch = require( 'yt-search' );
const SQLite = require("better-sqlite3");
const serverVolumeSql = new SQLite('./db/serverVolume.sqlite');
const songQueue = new SQLite('./db/songQueue.sqlite');
const alexaColor = "#31C4F3";
let endReason = "none";

const musicQueue = require('./musicQueue.js');
//const musicNext = require('./musicNext.js');


async function musicPlay(message, msgContent, caseSensitiveContent) {
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
            .setThumbnail(`https://media.giphy.com/media/8Bl2dceNUgY7sylmiU/giphy.gif`)
            .setImage(`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`)
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
                        musicPlay(message,`alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`, `alexa play fromalexaqueue https://youtube.com/watch?v=${getServerQueue.videoId}`);
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
            .catch( (error) => {
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
                musicPlay(message, caseSensitiveContent.split("&list=")[0], caseSensitiveContent.split("&list=")[0]);

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
                    musicNext(message);
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
}

module.exports = {
    musicPlay: musicPlay,
    getEndReason: async function () {return endReason},
    setEndReason: async function (newEndReason) {endReason = newEndReason}
};