const Discord = require('discord.js');
const snekfetch = require('snekfetch');

const Reddit = {
    randomMeme: async function(message) {
        try {
            await snekfetch
                .get('https://www.reddit.com/user/alexadiscordbot/m/memes.json?sort=top&t=week&limit=100')
                .then(r => {redditPull = r.body.data.children});

                const sfw = redditPull.filter(meme => !meme.data.over_18);
                const random = Math.floor(Math.random() * sfw.length);
                const memeEmbed = new Discord.RichEmbed();
                message.channel.send(memeEmbed
                    .setAuthor(`/u/${sfw[random].data.author}`)
                    .setTitle(sfw[random].data.title)
                    .setURL(`http://www.reddit.com${sfw[random].data.permalink}`)
                    .setImage(sfw[random].data.url)
                    .setFooter(`From the brilliant minds of /${sfw[random].data.subreddit_name_prefixed}`)
                    );
                //console.log(sfw.length)
        } catch (err) {
            return console.log(err);
        }
    }
}

module.exports = Reddit;