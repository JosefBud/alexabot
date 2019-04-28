const Discord = require('discord.js');

async function musicPause(message, client, pauser) {
    if (client.voiceConnections.get(message.guild.id)) {
        if (client.voiceConnections.get(message.guild.id).player.dispatcher.paused) {
            message.channel.send(`${pauser} has asked me to pause, but the music is already paused! \nIf you're trying to unpause it, use the ▶ reaction emoji or try \`Alexa resume\` or \`Alexa play\``)
        } else {
            client.voiceConnections.get(message.guild.id).player.dispatcher.pause()
            message.channel.send(`Music has been paused by ${pauser}! \nUse the ▶ reaction emoji to resume, or just type \`Alexa resume\` or \`Alexa play\`.`)

        }
    } else {
        message.channel.send(`There's no music for me to pause, ${pauser}!`)
    }
}

module.exports = musicPause;