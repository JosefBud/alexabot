const Discord = require('discord.js');
const fs = require('fs');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const ytSearch = require( 'yt-search' );

async function searchYoutube(searchQuery) {
    await ytSearch(searchQuery, function (err, result) {
        if (err) {
            console.log(err)
            message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
            return;
        }

        const videos = result.videos
        const firstResult = videos[0]
        console.log(firstResult)
        videoObj = {
            videoId: firstResult.videoId,
            name: firstResult.title,
            seconds: firstResult.seconds
        }

        if (firstResult.videoId.length !== 11) {
            message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
            return;
        }

        return;
    })
}
const VoiceRecog = {
    listen: async function(client, message) {
        let fileName;
        function generateOutputFile(channel, member) {
            // use IDs instead of username cause some people have stupid emojis in their name
            fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}`;
            return fs.createWriteStream(`${fileName}.pcm`);
        }
        const channel = message.member.voiceChannel;
        const broadcast = client.createVoiceBroadcast();
        
        channel.join()
            .then(conn => {
                broadcast.playFile('./beep.mp3')
                const dispatcher = conn.playBroadcast(broadcast)
                message.reply('ready!');
                // create our voice receiver
                const receiver = conn.createReceiver();
        
                conn.on('speaking', async (user, speaking) => {
                    if (speaking) {
                        //message.channel.send(`I'm listening to ${user}`);
                        // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
                        const audioStream = receiver.createPCMStream(user);
                        
                        // create an output stream so we can dump our data in a file
                        const outputStream = generateOutputFile(channel, user);
                        
                        // client.channels.get(channel.guild.systemChannelID).send("Success!")

                        // pipe our audio data into the file stream
                        audioStream.pipe(outputStream);
                        
                        /*
                        outputStream.on("data", (chunk) => {
                            console.log(`Received ${chunk.length} bytes of data.`)
                        });
                        */

                        // when the stream ends (the user stopped talking) tell the user
                        audioStream.on('end', async () => {
                            console.log("Pushing voice file");
                            //message.channel.send(`I'm no longer listening to ${user}`);
                            
                            if (fs.existsSync(`${fileName}.pcm`)) {
                                    ffmpeg()
                                        .on('end', async () => {
                                            // DELETES UNCOMPRESSED PCM FILE
                                            fs.unlink(`${fileName}.pcm`, (err) => {if (err) throw err;})

                                            // ENSURES THE CONVERTED FILE EXISTS, OTHERWISE IT CRASHES
                                            if (fs.existsSync(`${fileName}.opus`)) {
                                                // CHECKING FILE SIZE TO MAKE SURE IT'S (HOPEFULLY) ONLY PICKING UP COMMANDS, NOT A SPLIT SECOND OF AUDIO NOR A PERSON TALKING FOR LONGER THAN A COUPLE SECONDS
                                                let fileStats = fs.statSync(`${fileName}.opus`)
                                                let fileSize = fileStats.size
                                                if (fileSize < 30000 && fileSize > 5000) {
                                                    const speechClient = new speech.SpeechClient();
                            
                                                    // The name of the audio file to transcribe
                                                    
                                                    // Reads a local audio file and converts it to base64
                                                    const file = fs.readFileSync(`${fileName}.opus`);
                                                    const audioBytes = file.toString('base64');
                                                    
                                                    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
                                                    const audio = {
                                                    content: audioBytes,
                                                    };
                                                    const config = {
                                                    encoding: 'OGG_OPUS',
                                                    sampleRateHertz: 48000,
                                                    languageCode: 'en-US',
                                                    };
                                                    const request = {
                                                    audio: audio,
                                                    config: config,
                                                    };

                                                    // Detects speech in the audio file
                                                    speechClient
                                                        .recognize(request)
                                                        .then(data => {
                                                            const response = data[0];
                                                            let transcription = response.results
                                                                .map(result => result.alternatives[0].transcript)
                                                                .join('\n');

                                                            transcription = transcription.toLowerCase();
                                                            console.log(`Transcription: ${transcription}`);

                                                            if (transcription.startsWith("alexa")) {
                                                                client.channels.get(channel.guild.systemChannelID).send(`${user.username} said: ${transcription}`)
                                                            }
                                                            if (transcription.includes("alexa play")) {
                                                                let searchQuery = transcription.split("alexa play ")[1];
                                                                let streamOptions = {volume: 0.5};
                                                                //let videoObj = await searchYoutube(searchQuery);
                                                                ytSearch(searchQuery, function (err, result) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                        message.channel.send(`Something went wrong! Alexa is sorry, bb. Try again or try a different search term.`)
                                                                        return;
                                                                    }
                                                            
                                                                    const videos = result.videos
                                                                    const firstResult = videos[0]
                                                                    let videoObj = {
                                                                        videoId: firstResult.videoId,
                                                                        name: firstResult.title,
                                                                        seconds: firstResult.seconds
                                                                    }
                                                            
                                                                    if (firstResult.videoId.length !== 11) {
                                                                        message.channel.send("That video doesn't seem to have a valid video ID. If you think this message is an error, please let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
                                                                        return;
                                                                    }
                                                            
                                                                    console.log(videoObj);
                                                                    const stream = ytdl(`https://www.youtube.com/watch?v=${videoObj.videoId}`, {quality: 'highestaudio'});
                                                                    const dispatcher = conn.playStream(stream, streamOptions);
                                                                })
                                                            }

                                                            if (transcription.includes("alexa pause")) {
                                                                client.voiceConnections.get(conn.channel.guild.id).player.dispatcher.pause();
                                                            }

                                                            if (transcription.includes("alexa resume")) {
                                                                client.voiceConnections.get(conn.channel.guild.id).player.dispatcher.resume();
                                                            }

                                                            if (transcription.includes("alexa shut the fuck up")) {
                                                                client.voiceConnections.get(conn.channel.guild.id).disconnect();
                                                            }
                                                        })
                                                        .catch(err => {
                                                            console.error('ERROR:', err);
                                                        });
                                                }
                                            }
                                            
                                        })
                                        .input(`${fileName}.pcm`)
                                        .inputOptions([
                                            '-f s32be',
                                            '-acodec pcm_s32le',
                                            '-ar 48000',
                                            '-ac 1'
                                        ])
                                        .output(`${fileName}.opus`)
                                        .format('opus')
                                        .run()
                            }
                        });
                    }
                });
            })
            .catch(console.error)
    }
};

module.exports = VoiceRecog;