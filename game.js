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
            sql.prepare("CREATE TABLE game (id TEXT PRIMARY KEY, userId TEXT, username TEXT, guild TEXT, xp INTEGER, level INTEGER, stage INTEGER);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_game_id ON game (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
        client.getProfile = sql.prepare("SELECT * FROM game WHERE userId = ? AND guild = ?");
        client.setProfile = sql.prepare("INSERT OR REPLACE INTO game (id, userId, username, guild, xp, level, stage) VALUES (@id, @userId, @username, @guild, @xp, @level, @stage);");
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
                level: 1,
                stage: 0
              }
        }
        profile.xp++;
        if (profile.xp > 9) {
            profile.level++;
            message.channel.send("Congrats! You've leveled up to level " + profile.level);
            profile.xp = 0;
        };
        setTimeout(function(){client.setProfile.run(profile);}, 1000);
    },

    test: function(client,message) {
        message.channel.send(`You currently have ${profile.xp} XP and are level ${profile.level} and are on stage ${profile.stage}`);
        console.log(profile);
    },

    stage0: function(client,message) {
        message.channel.send(`Would you like to begin the game?`)
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
                collector.on('collect', message => {
                    if (message.content.includes("yes") || message.content.includes("yeah") || message.content.includes("ya")) {
                        profile.stage++;
                        message.channel.send(`The game has begun and automatically been saved.`);
                        console.log(profile)
                    } else if (message.content.includes("no") || message.content.includes("nah") || message.content.includes("nope")) {
                       message.channel.send(`Yeah I don't blame you`);
                    }
                })
    }
};

module.exports = Game;