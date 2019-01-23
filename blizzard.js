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
				characterTalents = [];
				for (i = 0 ; i < 7; i++) {
					let characterTalentsRaw = {tier: response.data.talents[0].talents[i].tier, name: response.data.talents[0].talents[i].spell.name, description: response.data.talents[0].talents[i].spell.description};
					characterTalents.push(characterTalentsRaw);
					characterTalents[i].description = characterTalents[i].description.replace("\n\n\n\n"," ");
					characterTalents.sort(function (a, b) {
						return a.tier - b.tier;
					});
				}
				//characterTalentsRaw = {tier: response.data.talents[0].talents[1].tier, name: response.data.talents[0].talents[1].spell.name}
				//BlizzardMatching.talents(characterTalentsRaw);
				setTimeout(() => {console.log(characterTalents);}, 1000)
			});
            setTimeout(() => { blizzard.wow.character(['items'], { origin: 'us', realm: realmName, name: characterName })
            .catch(function() {message.channel.send("That character doesn't exist, or you may have typed something wrong.")})
            .then(response => {
                //console.log(response.data);
                
                var characterClass = BlizzardMatching.classes(response);
                var characterRace = BlizzardMatching.races(response);
                var characterColor = BlizzardMatching.classColor(characterClass);
				var characterFaction = BlizzardMatching.faction(response);
                
                message.channel.send(wowProfile
                    .setColor(characterColor)
                    .setImage(`http://render-us.worldofwarcraft.com/character/${response.data.thumbnail.slice(0,-10).concat("","inset.jpg")}`)
                    .setAuthor(`${response.data.name} (${response.data.realm})`,`${characterFaction}`,`https://worldofwarcraft.com/en-us/character/${realmName}/${characterName}`)
                    .setTitle(`WoW Armory page`)
                    .setURL(`https://worldofwarcraft.com/en-us/character/${realmName}/${characterName}`)
					.setDescription(`Level ${response.data.level} ${characterRace} ${characterClass}`)
					.addField(`Character Spec`,`${characterSpec} (${characterSpecRole})`, true)
					.addField(`Average Item Level`,`${response.data.items.averageItemLevel}`, true)
					.addField(`Achievement Points`,`${response.data.achievementPoints}`, true)
					.addField(`Talents`, `**15: ${characterTalents[0].name}** \`\`(${characterTalents[0].description})\`\` 
					**30: ${characterTalents[1].name}** \`\`(${characterTalents[1].description})\`\` 
					**45: ${characterTalents[2].name}** \`\`(${characterTalents[2].description})\`\` 
					**60: ${characterTalents[3].name}** \`\`(${characterTalents[3].description})\`\` 
					**75: ${characterTalents[4].name}** \`\`(${characterTalents[4].description})\`\` 
					**90: ${characterTalents[5].name}** \`\`(${characterTalents[5].description})\`\` 
					**100: ${characterTalents[6].name}** \`\`(${characterTalents[6].description})\`\``, true));
            });},750)
        }
    }
}

module.exports = BlizzardCmd;