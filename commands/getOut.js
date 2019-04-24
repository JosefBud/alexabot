const SQLite = require("better-sqlite3");
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');

async function getOut(message, msgContent) {
    const channelId = msgContent.slice(19,-1);
    const getChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE id = ?;")
    const setChannels = bannedChannelsSql.prepare("INSERT OR REPLACE INTO bannedChannels (id, guildId, channelId) VALUES (@id, @guildId, @channelId);")
    
    if (channelId.length !== 18) {
        message.channel.send(`You may have typed something wrong. Try again and remember to only use one channel at a time, and tag it using \`#\`.`)
    } else {
        let alreadyBanned = getChannels.get(`${message.guild.id}-${channelId}`);
        if (alreadyBanned) {
            message.channel.send(`I'm already out of that channel!`)
        } else {
            console.log(alreadyBanned)
            var bannedChannelObj = {
                id: `${message.guild.id}-${channelId}`,
                guildId: message.guild.id,
                channelId: channelId
            }
            setChannels.run(bannedChannelObj);
            message.channel.send(`Okay! I'll ignore your pleas for help in that channel. Use **Alexa come back to [channel]** to bring me back there`)
        }
    }
}

module.exports = getOut;