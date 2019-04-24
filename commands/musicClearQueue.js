const SQLite = require("better-sqlite3");
const songQueue = new SQLite('./db/songQueue.sqlite');

async function musicClearQueue(message) {
    const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ?").all(message.guild.id);
    
    if (getServerQueue[0]) {
        songQueue.prepare("DELETE FROM songQueue WHERE guildId = ?").run(message.guild.id);
        message.channel.send("The song queue has been cleared!");
    } else {message.channel.send("There is no song queue to clear!");};
}

module.exports = musicClearQueue;