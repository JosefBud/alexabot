const Discord = require('discord.js');
const weather = require("weather-js");

async function whatIsWeather(message) {
    let weatherLocation;

    async function findWeather(message, weatherLocation) {
        weather.find({search: weatherLocation, degreeType: 'F'}, (err, result) => {
            if (err) {
                console.log(err)
                message.channel.send("Something went wrong there. Are you sure you typed everything correctly?")
                return;
            }
            const weatherEmbed = new Discord.RichEmbed();
            let celsius = Math.round((parseInt(result[0].current.temperature) - 32) * 5 / 9)
            let feelsLikeCelsius = Math.round((parseInt(result[0].current.feelslike) - 32) * 5 / 9)
            let zipCode;
            if (result[0].location.zipcode) {
                zipCode = "(" + result[0].location.zipcode + ")"
            } else {zipCode = ""}

            weatherEmbed
                .setAuthor(`${result[0].location.name} ${zipCode}`, result[0].current.imageUrl)
                .setDescription(`**Current temperature:** ${result[0].current.temperature}°F (${celsius}°C)\n**Feels like:** ${result[0].current.feelslike}°F (${feelsLikeCelsius}°C)\n**Skies:** ${result[0].current.skytext}\n**Humidity:** ${result[0].current.humidity}%\n**Wind:** ${result[0].current.winddisplay}`)
                .setThumbnail(result[0].current.imageUrl)
                .setFooter(`As of ${result[0].current.observationtime}`)

            message.channel.send(weatherEmbed)
        })
    }

    if (message.content.toLowerCase() === "alexa what is the weather" || message.content.toLowerCase() === "alexa how is the weather") {
        let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 })
        message.channel.send("What location do you want the weather for? You can either tell me the city or postal code (the latter will be more accurate)")
        collector.on('collect', message => {
            findWeather(message, message.content);
            collector.stop()
            return;
        })

        collector.on("end", (collected,reason) => {
            if (reason === 'time') {
                message.channel.send("You took too much time to respond!");
            } else {return;}
        })
    } else if (message.content.toLowerCase().startsWith("alexa what is the weather in")) {
        weatherLocation = message.content.slice(29);
        findWeather(message, weatherLocation);
        return;
    } else if (message.content.toLowerCase().startsWith("alexa how is the weather in")) {
        weatherLocation = message.content.slice(28);
        findWeather(message, weatherLocation);
        return;
    }
}

module.exports = whatIsWeather;