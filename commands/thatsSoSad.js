const Discord = require('discord.js');

const musicPlay = require('./musicPlay.js')

async function thatsSoSad(message) {
    message.reply(`sorry you're sad. Would you like me to play Despacito?`);

    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
    collector.on('collect', message => {
        if (message.content.toLowerCase().includes("yes") || message.content.toLowerCase().includes("yeah") || message.content.toLowerCase().includes("ya") || message.content.toLowerCase().includes("sure")) {
            collector.stop();
            if (typeof message.member.voiceChannel !== 'undefined') {
                collector.stop();
                musicPlay(message, "alexa play despacito", "alexa play despacito");
            }
            else {
                collector.stop();
                message.reply(`get in a voice channel, ya bonehead`);
            }
        } else if (message.content.toLowerCase().includes("no") || message.content.toLowerCase().includes("nah") || message.content.toLowerCase().includes("nope")) {
            collector.stop();
            message.channel.send("Okie dokie. Hope you feel better.");
        }
    })
}

module.exports = thatsSoSad;