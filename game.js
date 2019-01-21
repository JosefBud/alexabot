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
            sql.prepare("CREATE TABLE game (id TEXT PRIMARY KEY, userId TEXT, username TEXT, guild TEXT, stage INTEGER, xp INTEGER, level INTEGER, skillPoints INTEGER, strength INTEGER, constitution INTEGER, dexterity INTEGER, intelligence INTEGER, wisdom INTEGER, charisma INTEGER);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_game_id ON game (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
        client.getProfile = sql.prepare("SELECT * FROM game WHERE userId = ? AND guild = ?");
        client.setProfile = sql.prepare("INSERT OR REPLACE INTO game (id, userId, username, guild, stage, xp, level, skillPoints, strength, constitution, dexterity, intelligence, wisdom, charisma) VALUES (@id, @userId, @username, @guild, @stage, @xp, @level, @skillPoints, @strength, @constitution, @dexterity, @intelligence, @wisdom, @charisma);");
    },

    profile: function(client,message) {
        profile = client.getProfile.get(message.author.id, message.guild.id)
        if (!profile) {
            profile = {
                id: `${message.guild.id}-${message.author.id}`,
                userId: message.author.id,
                username: message.author.username,
                guild: message.guild.id,
                stage: 0,
                xp: 0,
                level: 1,
                skillPoints: 0,
                strength: 1,
                constitution: 1,
                dexterity: 1,
                intelligence: 1,
                wisdom: 1,
                charisma: 1
              }
        }
        profile.xp++;
        if (profile.xp >= 10) {
            profile.level++;
            profile.skillPoints = profile.skillPoints + 5;
            //message.channel.send("Congrats! You've leveled up to level " + profile.level);
            profile.xp = 0;
        };
        setTimeout(function(){client.setProfile.run(profile);}, 1000);
    },

    test: function(message) {
        message.channel.send(`You currently have ${profile.xp} XP and are level ${profile.level} with ${profile.skillPoints} skill points. You are on stage ${profile.stage}.`);
        console.log(profile);
    },

    createCharacter: function(message) {
        message.channel.send(`We use the DnD style of assigning attribute points. You have six set numbers: **15, 14, 13, 12, 10 and 8**. Each number can be assigned to an attribute. \n Where would you like **15** points to be assigned to?`)
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
        collector.on("collect", message => {
            if (message.content.toLowerCase().startsWith("str")) {
                profile.strength = profile.strength + 15;
            }

            if (message.content.toLowerCase().startsWith("con")) {
                profile.constitution = profile.constitution + 15;
            }

            if (message.content.toLowerCase().startsWith("dex")) {
                profile.dexterity = profile.dexterity + 15;
            }

            if (message.content.toLowerCase().startsWith("int")) {
                profile.intelligence = profile.intelligence + 15;
            }

            if (message.content.toLowerCase().startsWith("wis")) {
                profile.wisdom = profile.wisdom + 15;
            }
            
            if (message.content.toLowerCase().startsWith("cha")) {
                profile.charisma = profile.charisma + 15;
            }
        })
    },

    profileReset: function(message) {
        profile.stage = 0;
        profile.xp = 0;
        profile.level = 1;
        profile.skillPoints = 30;
        profile.strength = 1;
        profile.constitution = 1;
        profile.dexterity = 1;
        profile.intelligence = 1;
        profile.wisdom = 1;
        profile.charisma = 1;
        message.channel.send(`Your profile has been reset to default values!`);
    },

    emojiTest: function(message) {
        const requestedBy = message.author.id
        message.channel.send(`This is an emoji test`)
        .then(message => {message.react('💪')})
        const filter = (reaction, user) => reaction.emoji.name === '💪' && user.id === requestedBy
        const emojiCollector = message.createReactionCollector(filter, { time: 5000 });
        emojiCollector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
        emojiCollector.on('end', collected => console.log(`Collected ${collected.size} items`));
    },

    spendSkillPoints: function(message) {
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
        const embed = new Discord.RichEmbed();
        const addAttributePoints = function(message,attribute) {
            let addPoints = parseInt(message.content);
            if (addPoints < profile.skillPoints) {
                profile[attribute] = profile[attribute] + addPoints;
                profile.skillPoints = profile.skillPoints - addPoints;
                message.channel.send(`You have successfully added ${addPoints} points to ${attribute}`);
                if (profile.skillPoints > 0) {
                    message.channel.send(`You still have ${profile.skillPoints} left over! Use "alexa spend skill points" again to continue spending them.`);
                } else {
                    message.channel.send(`You've spent all of your skill points! Continue leveling up to earn more.`)
                };
            } else if (addPoints > profile.skillPoints) {
                message.channel.send(`You don't have enough skill points to do that!`)
            }
        }
        message.channel.send(embed
            .setAuthor(`${profile.username}`,message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .addField(`__Attributes__`,`Strength: **${profile.strength}** \n Constitution: **${profile.constitution}** \n Dexterity: **${profile.dexterity}** \n Intelligence: **${profile.intelligence}** \n Wisdom: **${profile.wisdom}** \n Charisma: **${profile.charisma}**`)
            .addField(`__Skill points__`,`You have **${profile.skillPoints}** skill points to spend.`)
            .setFooter("Reply with how many points you want to spend, followed by the attribute. For example \"4 Strength\" or \"3 Intelligence\". Shorthand using the first 3 letters can be used, such as \"4 str\" or \"3 int\". Only one attribute can be updated in the reply."));
            collector.on('collect', message => {
                if (message.content.toLowerCase().endsWith("str") || message.content.toLowerCase().endsWith("strength")) {
                    addAttributePoints(message,"strength");
                }

                if (message.content.toLowerCase().endsWith("con") || message.content.toLowerCase().endsWith("constitution")) {
                    addAttributePoints(message,"constitution");
                }

                if (message.content.toLowerCase().endsWith("dex") || message.content.toLowerCase().endsWith("dexterity")) {
                    addAttributePoints(message,"dexterity");
                }

                if (message.content.toLowerCase().endsWith("int") || message.content.toLowerCase().endsWith("intelligence")) {
                    addAttributePoints(message,"intelligence");
                }

                if (message.content.toLowerCase().endsWith("wis") || message.content.toLowerCase().endsWith("wisdom")) {
                    addAttributePoints(message,"wisdom");
                }

                if (message.content.toLowerCase().endsWith("cha") || message.content.toLowerCase().endsWith("charisma")) {
                    addAttributePoints(message,"charisma");
                }

                //else {message.channel.send(`You must've typed something incorrectly, please try again.`)}
            });
    },

    stage: function(client,message) {
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
        if (profile.stage === 0) {
            message.channel.send(`Would you like to begin the game?`)
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

        if (profile.stage === 1) {
            message.channel.send(`Would you like to proceed to the next stage?`);
                collector.on('collect', message => {
                    if (message.content.includes("yes") || message.content.includes("yeah")) {
                        profile.stage++;
                        message.channel.send(`You have entered the next stage.`);
                        console.log(profile);
                    } else if (message.content.includes("no")) {
                        message.channel.send(`Okay. You've stayed still`);
                    }
                })
            
        }
    }
};

module.exports = Game;