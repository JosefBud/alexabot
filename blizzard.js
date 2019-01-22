const Discord = require('discord.js');
const config = require('./config.json')
const blizzard = require('blizzard.js').initialize({
	origin: 'us',
	locale: 'en-US',
	key: config.blizzardKey,
	secret: config.blizzardSecret,
	token: config.blizzardToken
	});

const BlizzardCmd = {
    test: function(message) {
        blizzard.wow.character(['profile'], { origin: 'us', realm: 'azgalor', name: 'calle' })
        .then(response => {
        console.log(response.data);
    });
    }
}

module.exports = BlizzardCmd;