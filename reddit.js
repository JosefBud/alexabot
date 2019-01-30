const Discord = require('discord.js');
const snekfetch = require('snekfetch');

const Reddit = {
    randomMeme: async function(message) {
        try {
            await snekfetch
                .get('https://www.reddit.com/user/alexadiscordbot/m/memes.json?sort=top&t=day&limit=100')
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
        } 
        catch (err) {
            return console.log(err);
        }
    },

    giveSub: async function(message) {
        try {
            const requestedSub = message.content.slice(17);
            console.log(requestedSub);
            await snekfetch
                .get(`https://www.reddit.com/r/${requestedSub}.json?sort=top&t=day&limit=50`)
                .then(r => {giveSubPull = r.body.data.children});
            
            const sfw = giveSubPull.filter(post => !post.data.over_18);
            const random = Math.floor(Math.random() * sfw.length);
            const subEmbed = new Discord.RichEmbed();

            const urlFileExtension = sfw[random].data.url.slice(-4).replace(".","");
            if (urlFileExtension === "jpg" || urlFileExtension === "jpeg" || urlFileExtension === "gif" || urlFileExtension === "png" || urlFileExtension === "webp") {
                subEmbed
                .setImage(sfw[random].data.url)
                .setDescription("")
                .setThumbnail("");
            } else {
                subEmbed
                .setImage("")
                .setDescription(sfw[random].data.url)
                .setThumbnail(sfw[random].data.thumbnail);
            }
                message.channel.send(subEmbed
                    .setAuthor(`/u/${sfw[random].data.author}`)
                    .setTitle(sfw[random].data.title)
                    .setURL(`http://www.reddit.com${sfw[random].data.permalink}`)
                    .setFooter(`From the brilliant minds of /${sfw[random].data.subreddit_name_prefixed}`)
                    );
            console.log(urlFileExtension);
        } 
        catch (err) {
            return console.log(err);
        }
    }
}

module.exports = Reddit;