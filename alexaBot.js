const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./discordbot.js', { token: config.token });

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));