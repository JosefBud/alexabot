const Discord = require('discord.js');
const fs = require('fs');
const speech = require('@google-cloud/speech');
const ffmpeg = require('fluent-ffmpeg');

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
        
                conn.on('speaking', (user, speaking) => {
                  if (speaking) {
                    //message.channel.send(`I'm listening to ${user}`);
                    // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
                    const audioStream = receiver.createPCMStream(user);
                    
                    // create an output stream so we can dump our data in a file
                    const outputStream = generateOutputFile(channel, user);

                    // pipe our audio data into the file stream
                    audioStream.pipe(outputStream);
                    outputStream.on("data", (chunk) => {
                        console.log(`Received ${chunk.length} bytes of data.`)
                    });
                    // when the stream ends (the user stopped talking) tell the user
                    audioStream.on('end', async () => {
                        //message.channel.send(`I'm no longer listening to ${user}`);
                        
                        ffmpeg()
                            .on('end', () => {
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
                                            const transcription = response.results
                                            .map(result => result.alternatives[0].transcript)
                                            .join('\n');
                                            message.channel.send(`Transcription: ${transcription}`);
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
                        
                    });
                  }
                });
            })
            .catch(console.error)
    },

    test: async function () {
        // Creates a client
        const speechClient = new speech.SpeechClient();
        
        // The name of the audio file to transcribe
        const fileName = './recordings/testoutput.opus';
        
        // Reads a local audio file and converts it to base64
        const file = fs.readFileSync(fileName);
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
            const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
            console.log(`Transcription: ${transcription}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    }
};

module.exports = VoiceRecog;