const fs = require('fs');

const musicPlay = require('./musicPlay.js')

async function musicStfu(message) {
    if (message.guild.voiceConnection) {
        musicPlay.setEndReason("stfu");
        message.channel.send(`Well fine, fuck you too`);
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
    } else {
        message.channel.send(`I'm not even doing anything, asshole`)
    }
}

module.exports = musicStfu;