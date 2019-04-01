const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const user = new Discord.Message();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', console.error);

client.on('message', message => {
    let msgContent = message.content.toLowerCase().replace(/[,!'.]/gi,"");

    // IGNORING DIRECT MESSAGES
    if (message.channel.type === 'dm') {
        if (!message.author.bot) {
            return;
        }

        return;
    }

    let consoleTimeStamp = new Date();
    if (message.guild.name !== "Discord Bot List") {
        console.log(consoleTimeStamp.toLocaleDateString('en-us',{timeZone:'America/New_York'}),`(${consoleTimeStamp.toLocaleTimeString('en-us',{timeZone:'America/New_York'})})`,`${message.author.username} (${message.guild.name}): ${message.content}`);
    }

    // NOT-BOT CHECK
    if (!message.author.bot) {
        if (msgContent.startsWith("siri")) {
            message.channel.send(`Sorry, I don't understand that. Would you like me to search the web for "${msgContent.slice(5)}"?\nhttps://www.bing.com/search?q=${message.content.slice(5).replace(/[ ]/gi, "%20")}`)
        }

        if (msgContent.startsWith("hey siri")) {
            message.channel.send(`Sorry, I don't understand that. Would you like me to search the web for "${msgContent.slice(9)}"?\nhttps://www.bing.com/search?q=${message.content.slice(9).replace(/[ ]/gi, "%20")}`)
        }

        if (msgContent.startsWith("alexa")) {
            message.channel.send(`Alexa? Who's that? I'm Siri, your virtual assistant. Use "Siri" or "Hey Siri" to ask me anything!`)
        }
    }
})

client.login(config.token);