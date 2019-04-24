async function musicPause(message, client) {
    if (client.voiceConnections.get(message.guild.id)) {
        if (client.voiceConnections.get(message.guild.id).player.dispatcher.paused) {
            message.channel.send("The music is already paused! If you're trying to unpause it, try \`Alexa resume\` or \`Alexa play\`")
        } else {
            client.voiceConnections.get(message.guild.id).player.dispatcher.pause()
            message.channel.send("Music paused! Use \`Alexa resume\` or \`Alexa play\` to resume.")
        }
    }
}

module.exports = musicPause;