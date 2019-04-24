const SQLite = require("better-sqlite3");
const bannedChannelsSql = new SQLite('./db/bannedChannels.sqlite');

async function comeBack(message, msgContent) {
    const channelId = msgContent.slice(21,-1);
    const getChannels = bannedChannelsSql.prepare("SELECT * FROM bannedChannels WHERE id = ?;").get(`${message.guild.id}-${channelId}`)
    const setChannels = bannedChannelsSql.prepare("DELETE FROM bannedChannels WHERE id = ?;")
    
    if (channelId.length !== 18) {
        message.channel.send(`You may have typed something wrong. Try again and remember to only use one channel at a time, and tag it using \`#\`.`)
    } else if (!getChannels) {
        message.channel.send(`I'm already allowed in there, thilly!`)
    } else {
        setChannels.run(`${message.guild.id}-${channelId}`);
        message.channel.send(`Okay! I'll come back. But only because you said the magic words.`)
    }
}

module.exports = comeBack;