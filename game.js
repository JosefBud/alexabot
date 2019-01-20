const Discord = require('discord.js');
// const client = new Discord.Client();
// const config = require('./config.json');
// const user = new Discord.Message();
// const broadcast = client.createVoiceBroadcast();
// const ytdl = require('ytdl-core');
// const streamOptions = { seek: 0, volume: 1 };
// const ytSearch = require( 'yt-search' )
const SQLite = require("better-sqlite3");
const sql = new SQLite('./game.sqlite');

const Game = {
    prep: function(client) {
        const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'game';").get();
        if (!table['count(*)']) {
            sql.prepare("CREATE TABLE game (id TEXT PRIMARY KEY, userId TEXT, username TEXT, guild TEXT, xp INTEGER, level INTEGER);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_game_id ON game (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
        client.getProfile = sql.prepare("SELECT * FROM game WHERE userId = ? AND guild = ?");
        client.setProfile = sql.prepare("INSERT OR REPLACE INTO game (id, userId, username, guild, xp, level) VALUES (@id, @userId, @username, @guild, @xp, @level);");
    },

    profile: function(client,message) {
        profile = client.getProfile.get(message.author.id, message.guild.id)
        if (!profile) {
            profile = {
                id: `${message.guild.id}-${message.author.id}`,
                userId: message.author.id,
                username: message.author.username,
                guild: message.guild.id,
                xp: 0,
                level: 1
              }
        }
        profile.xp++;
        if (profile.xp > 9) {
            profile.level++;
            message.channel.send("Congrats! You've leveled up to level " + profile.level);
            profile.xp = 0;
        };
        client.setProfile.run(profile);
    },

    test: function(client,message) {
        message.channel.send(`You currently have ${profile.xp} XP and are level ${profile.level}`);
    }
};

module.exports = Game;