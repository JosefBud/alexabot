async function musicResume(message, client) {
    if (client.voiceConnections.get(message.guild.id)) {
        if (client.voiceConnections.get(message.guild.id).player.dispatcher.paused) {
            client.voiceConnections.get(message.guild.id).player.dispatcher.resume()
            message.channel.send("Music resumed!")
        } else {
            message.channel.send("How does one unpause something that isn't paused? That's just silly\n *in all seriousness though if the music isn't unpausing please let me know on the support server*")
        }
    } else {
        message.channel.send("Not only am I not on pause, but I'm not even connected to your voice channel at all! If you're trying to play a song, use \`Alexa play [song name]\` instead of just \`Alexa play\`.")
    }
}

module.exports = musicResume;