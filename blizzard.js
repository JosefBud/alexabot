const Discord = require('discord.js');
const config = require('./config.json');
const BlizzardMatching = require('./blizzardMatching.js');
const blizzard = require('blizzard.js').initialize({
	origin: 'us',
	locale: 'en-US',
	key: config.blizzardKey,
	secret: config.blizzardSecret,
	token: config.blizzardToken
    });

const BlizzardCmd = {
    test: function(message, msgContent, client) {
        if (msgContent === "alexa wow profile") {
            const wowProfileHelp = new Discord.RichEmbed();
            message.channel.send(wowProfileHelp
                .addField(`Looking up a WoW profile`,`Use \`\`Alexa WoW profile [realm name] [character name]\`\``)
                .setFooter(`Without the brackets, obviez.`));
            return;
        } else {
            const wowProfile = new Discord.RichEmbed();
            var messageArray = msgContent.split(" ");
            var characterName = messageArray.pop();
            messageArray.shift(); messageArray.shift(); messageArray.shift();
            if (messageArray[1]) {
                realmName = messageArray.join("-");
            } else {realmName = messageArray.toString();};

			blizzard.wow.character(['talents'], {origin: 'us', realm: realmName, name: characterName})
			.then(response => {
				characterSpec = response.data.talents[0].spec.name;
				characterSpecRole = response.data.talents[0].spec.role;
			});
            setTimeout(() => { blizzard.wow.character(['items'], { origin: 'us', realm: realmName, name: characterName })
            .catch(function() {message.channel.send("That character doesn't exist, or you may have typed something wrong.")})
            .then(response => {
                //console.log(response.data);
                
                var characterClass = BlizzardMatching.classes(response);
                var characterRace = BlizzardMatching.races(response);
                var characterColor = BlizzardMatching.classColor(characterClass);
				var characterFaction = BlizzardMatching.faction(response);
				console.log(characterSpec);
                
                message.channel.send(wowProfile
                    .setColor(characterColor)
                    .setImage(`http://render-us.worldofwarcraft.com/character/${response.data.thumbnail.slice(0,-10).concat("","inset.jpg")}`)
                    .setAuthor(`${response.data.name} (${response.data.realm})`,`${characterFaction}`,`https://worldofwarcraft.com/en-us/character/${realmName}/${characterName}`)
                    .setTitle(`WoW Armory page`)
                    .setURL(`https://worldofwarcraft.com/en-us/character/${realmName}/${characterName}`)
                    .setDescription(`Level ${response.data.level} ${characterRace} ${characterClass}`)
                    .addField(`Average Item Level`,`${response.data.items.averageItemLevel}`, true)
					.addField(`Achievement Points`,`${response.data.achievementPoints}`, true)
					.addField(`Character Spec`,`${characterSpec} (${characterSpecRole})`));
            });},500)
        }
    }
}

module.exports = BlizzardCmd;