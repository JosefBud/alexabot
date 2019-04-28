const fs = require('fs');

const musicPlay = require('./musicPlay.js')

async function musicStfu(message, requester) {
    if (message.guild.voiceConnection) {
        musicPlay.setEndReason("stfu");
        if (requester) {
            message.channel.send(`${requester} has requested me to shut up.`);
        } else {
            message.channel.send(`Color me shutted up!`);
        }
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
        if (requester) {
            message.channel.send(`I'm not even doing anything, ${requester}. Why are you pressing the stop button?`)
        }
        message.channel.send(`I'm not even doing anything, my guy.`)
    }
}

module.exports = musicStfu;