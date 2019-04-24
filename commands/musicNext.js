const SQLite = require("better-sqlite3");
const songQueue = new SQLite('./db/songQueue.sqlite');

const musicPlay = require("./musicPlay.js");

async function musicNext(message) {
    const getServerQueue = songQueue.prepare("SELECT * FROM songQueue WHERE guildId = ? ORDER BY sortOrder ASC").get(message.guild.id);
    if (getServerQueue) {
        musicPlay.setEndReason("next")
        musicPlay.musicPlay(message,`alexa play https://youtu.be/${getServerQueue.videoId}`, `alexa play https://youtu.be/${getServerQueue.videoId}`)
        songQueue.prepare("DELETE FROM songQueue WHERE guildId = ? AND videoId = ?").run(message.guild.id, getServerQueue.videoId);
        setTimeout(() => {musicPlay.setEndReason("none");}, 1000)
    } else {message.channel.send("There is no next song, silly gooth!")}
}

module.exports = musicNext;