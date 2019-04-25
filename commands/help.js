const Discord = require('discord.js');
const fs = require('fs');
const alexaColor = "#31C4F3";

const helpArraysRaw = fs.readFileSync('./db/helpArrays.json');
const helpArrays = JSON.parse(helpArraysRaw);
const StockMarket = require('../stockMarket.js');

async function makeDescription(pageNum) {
    let description = "";
    helpArrays[pageNum].forEach((element) => {
        description += element + "\n"
    })
    return description;
}

async function help(message, msgContent) {
    const helpEmbed = new Discord.RichEmbed();
    helpEmbed.setColor(alexaColor);

    // IF IT'S A HELP COMMAND WITHOUT A PAGE NUMBER
    if (msgContent === "alexa" || msgContent === "alexa help" || msgContent === "alexa commands") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 1`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 2")`)
            .setDescription(await makeDescription("1"))
            
        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } 
    
    // IF IT'S A HELP COMMAND WITH A PAGE NUMBER
    else if (msgContent.slice(-1) === "1" || msgContent.slice(-1) === "2" || msgContent.slice(-1) === "3" || msgContent.slice(-1) === "4") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page ${msgContent.slice(-1)}`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 3")`)
            .setDescription(await makeDescription(msgContent.slice(-1)))

        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } 
    
    // IF IT'S A HELP COMMAND FOR STOCKS
    else if (msgContent === "alexa help stocks") {
        StockMarket.help(message);
    } 
    
    // RESPONSE FOR ANY OTHER DIRECT MESSAGE
    else {
        if (message.channel.type === "dm") {
            message.reply("I can only give you the help menu in DMs. If you're trying to use one of my commands, you need to do it in a server, not a DM. Try `Alexa help` or go through the help pages by using `Alexa help [1-4]` (e.g. `Alexa help 3`)")
            return;
        } else {
            message.channel.send("You may have typed something wrong or attempted to access a page that doesn't exist. Try again using `Alexa help [1-4]` (e.g. `Alexa help 3`).");
            return;
        }
    }
}

module.exports = help