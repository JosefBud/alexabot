const Discord = require('discord.js');
const alexaColor = "#31C4F3";

const StockMarket = require('../stockMarket.js');

async function help(message, msgContent) {
    const helpEmbed = new Discord.RichEmbed();
    helpEmbed.setColor(alexaColor);
    if (msgContent.slice(-1) === "1" || msgContent === "alexa" || msgContent === "alexa help" || msgContent === "alexa commands") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 1`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
            .setDescription(`
                **Alexa play [song name]** will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.
                **Alexa queue [song name]** will queue up a song to play when the current one is finished.
                **Alexa queue** will show the current queue of songs.
                **Alexa clear queue** will clear out the current queue of songs.
                **Alexa next** will play the next song in the queue.
                **Alexa STFU** will disconnect Alexa from the voice channel.
                **Alexa volume** will bring up the volume commands and current volume.
                **Alexa volume [0-100]%** will change the volume to the number you set.
                **Alexa volume down** or **Alexa volume up** changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.
            `)
            
        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } else if (message.channel.type === "dm" && msgContent === "help") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 1`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
            .setDescription(`
                **Alexa play [song name]** will stream a song from YouTube into the voice channel you're in. This is pulling the top search result from YouTube, and YouTube search sucks sometimes, so it helps if you include the artist name.
                **Alexa queue [song name]** will queue up a song to play when the current one is finished.
                **Alexa queue** will show the current queue of songs.
                **Alexa clear queue** will clear out the current queue of songs.
                **Alexa next** will play the next song in the queue.
                **Alexa STFU** will disconnect Alexa from the voice channel.
                **Alexa volume** will bring up the volume commands and current volume.
                **Alexa volume [0-100]%** will change the volume to the number you set.
                **Alexa volume down** or **Alexa volume up** changes the volume by 10%. This doesn't work *while* you're playing a song, it only adjusts it for the next time you play a song.
            `)

        message.reply(helpEmbed);
        return;
    } else if (msgContent.slice(-1) === "2") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 2`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
            .setDescription(`
                __**Alexa Stock Market Game**__\n
                **Alexa stocks** or **Alexa stocks help** will bring up this list of commands.
                **Alexa stocks start** is the starting point. This will create a profile for you in the stock market and give you $50,000 to make your investments.
                **Alexa stocks search [company name]** will provide the stock **symbol** for that company. This is important, because everything else relies on using stock symbols, **not** company names.
                **Alexa stocks buy [quantity] [symbol]** will buy shares in the company.
                **Alexa stocks sell [quantity] [symbol]** will sell shares back and return the money to your wallet.
                **Alexa stocks profile** or **Alexa stocks portfolio** will show you your current holdings, both in your wallet and your shares.
                **Alexa stocks price [symbol]** will show you the current price for shares of that company.
                **Alexa stocks history [symbol]** will show you a detailed history for that company's stock.
                **Alexa stocks leaderboard** will show you the current leaderboard for portfolio value.
            `)

        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } else if (msgContent.slice(-1) === "3") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 3`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
            .setDescription(`
                **Alexa what is the weather in [location]** will show you the weather for the location you ask for. You can use a city or a postal code, the latter will be more accurate.
                **Alexa minesweeper** will generate a random game of Minesweeper, 6x6 with 5 bombs.
                **Alexa profile** will show you your profile.
                **Alexa steal [@somebody]** will steal some cash from another person. There may or may not be a very small chance to steal a lot more than usual.
                **Alexa flip** will flip a coin. You either win money or you don't.
                **Alexa vote** will provide the link to vote for Alexa on discordbots.org.
                **Alexa get out of [#channel]** will stop Alexa from listening in the channel you specify.
                **Alexa come back to [#channel]** will bring Alexa back to a channel she was kicked out of.
            `)
            
        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } else if (msgContent.slice(-1) === "4") {
        helpEmbed
            .setAuthor(`Alexa Commands - Page 4`)
            .setTitle(`Use "Alexa help [1-4]" (e.g. "Alexa help 1")`)
            .setDescription(`
                **Alexa WoW profile [realm name] [character name]** will bring up info about that World of Warcraft character.
                **Alexa give me a meme** will give you a random fresh meme from Reddit.
                **Alexa give me /r/[subreddit]** will give you a random top post of the day from that subreddit.
                **Alexa buy [something]** will make an Amazon™ purchase and charge it to someone else's account. This is using l33t h4xx and is extremely illegal. Use with caution.
            `)
            
        if (message.channel.type === "dm") {
            message.reply(helpEmbed);
            return;
        } else {
            message.channel.send(helpEmbed);
            return;
        }
    } else if (msgContent === "alexa help stocks") {
        StockMarket.help(message);
    } else {
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