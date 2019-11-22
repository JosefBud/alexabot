const {
  ShardingManager
} = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./discordbot.js', {
  token: config.token,
  totalShards: 'auto'
});

manager.spawn(this.totalShards, 15000);
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));