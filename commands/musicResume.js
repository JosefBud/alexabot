const Discord = require('discord.js');

async function musicResume(message, client, resumer) {
    if (client.voiceConnections.get(message.guild.id)) {
        if (client.voiceConnections.get(message.guild.id).player.dispatcher.paused) {
            client.voiceConnections.get(message.guild.id).player.dispatcher.resume()
            message.channel.send(`Music has been resumed by ${resumer}!`)
        } else {
            message.channel.send(`How does one unpause something that isn't paused? That's just silly, ${resumer}. \nIf you're trying to pause the music, use the ⏸ reaction emoji or try \`Alexa resume\` or \`Alexa play\`.`)
        }
    } else {
        message.channel.send(`Not only am I not on pause, but I'm not even connected to your voice channel at all, ${resumer}! If you're trying to play a song, use \`Alexa play [song name]\` instead of just \`Alexa play\`.`)
    }
}

module.exports = musicResume;