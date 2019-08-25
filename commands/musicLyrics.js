const Discord = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

const config = require('../config.json');
const musicPlay = require('./musicPlay');

const alexaColor = "#31C4F3";

let lyricServers = {};

async function fetchLyrics(searchQuery, guildId, message) {
  return new Promise(resolve => {
    axios.get(`https://api.genius.com/search?q=${searchQuery}`, {
        params: {
          access_token: config.geniusKey
        }
      })
      .then(response => {
        if (!response.data.response.hits[0]) {
          message.channel.send("Couldn't find any lyrics for this song on Genius, sorry! If you believe this is an error, let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
        }
        axios.get(`https://api.genius.com${response.data.response.hits[0].result.api_path}`, {
            params: {
              access_token: config.geniusKey
            }
          })
          .then(res => {
            axios.get(`https://genius.com${res.data.response.song.path}`)
              .then(response => {
                const $ = cheerio.load(response.data);
                //console.log($('.lyrics').text().trim());
                lyricServers[guildId] = $('.lyrics').text().trim();
                resolve();
              })
          });
      })
      .catch(err => {
        console.log(err);
        message.channel.send("Couldn't find any lyrics for this song on Genius, sorry! If you believe this is an error, let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
      })
  })
}

async function musicLyrics(message) {
  const currentSong = musicPlay.getCurrentSong();

  if (!currentSong[message.guild.id]) {
    message.channel.send("Looks like you're not playing any music right now!");
    return;
  } else {
    let songName = currentSong[message.guild.id];

    songName = songName.split("(");
    songName = songName[0].split("[");
    songName = songName[0].split("w/");
    songName = songName[0];
    await fetchLyrics(songName, message.guild.id, message);

    if (!lyricServers[message.guild.id]) {
      message.channel.send("Couldn't find any lyrics for this song on Genius, sorry! If you believe this is an error, let me know on the Alexa Discord server: https://discord.gg/PysGrtD")
    }

    lyricsRaw = lyricServers[message.guild.id];
    lyricsHeaders = lyricsRaw.match(/\[.*?\]/g);
    lyrics = lyricsRaw.split(/\[.*?\]/g);
    lyrics.shift();

    let lyricEmbeds = "";

    let embed = new Discord.RichEmbed
    embed
      .setColor(alexaColor)
      .setTitle(songName)
      .setFooter(`Are these lyrics incorrect or buggy? Please let me know on the Alexa Discord server: https://discord.gg/PysGrtD`)

    lyrics.forEach((verse, index) => {
      if (verse.length > 1024) {
        const verseSplit = verse.match(/.{1,1024}/sg);
        embed.addField(lyricsHeaders[index], verseSplit[0], false);

        verseSplit.forEach(chunk => {
          if (chunk === verseSplit[0]) {
            return;
          }

          embed.addField('\u200b', chunk);
        })
      } else if (verse.length < 3) {
        embed.addField(lyricsHeaders[index], '\u200b')
        return;
      } else {
        embed.addField(lyricsHeaders[index], verse)
      }
    })

    message.channel.send(embed);
  }
}

module.exports = musicLyrics;