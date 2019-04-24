const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const serverVolumeSql = new SQLite('./db/serverVolume.sqlite');

async function musicVolume(message) {
    const volumeEmbed = new Discord.RichEmbed();
    const serverVolume = serverVolumeSql.prepare("SELECT * FROM serverVolume WHERE guildId = ?").get(message.guild.id)
    const setServerVolume = serverVolumeSql.prepare("UPDATE serverVolume SET volume = @volume WHERE guildId = @guildId;")
    if (message.content.toLowerCase().includes("down") && !message.content.toLowerCase().includes("up")) {
        if (serverVolume.volume > 0.2) {
            serverVolume.volume = serverVolume.volume - 0.1;
            setServerVolume.run(serverVolume);
            message.channel.send("Volume has been turned down for future songs");
        } else {message.channel.send("Volume is too low to be turned down further!")}
    }

    else if (message.content.toLowerCase().includes("up") && !message.content.toLowerCase().includes("down")) {
        if (serverVolume.volume < 0.99) {
            serverVolume.volume = serverVolume.volume + 0.1;
            setServerVolume.run(serverVolume)
            message.channel.send("Volume has been turned up for future songs");
        } else {message.channel.send("Volume is too high to be turned up further!")}
    } 
    
    else if (parseInt(message.content.slice(13)) >= 0 && parseInt(message.content.slice(13)) <= 100) {
        let newVolume = Math.floor(parseInt(message.content.slice(13))) / 100;
        serverVolume.volume = newVolume;
        setServerVolume.run(serverVolume);
        message.channel.send(`Volume has been changed to ${newVolume * 100}% for future songs`);
        //console.log(newVolume);
    }
    
    else {
        message.channel.send(volumeEmbed
            .addField("Setting volume for the \"Alexa play\" command","\`Alexa volume down\` turns volume down 10% \n \`Alexa volume up\` turns volume up 10% \n \`Alexa volume [1-100]\` sets the volume to that exact % number")
            .setFooter(`The volume is currently at ${Math.floor(serverVolume.volume * 100)}%`));
    }
}

module.exports = musicVolume;