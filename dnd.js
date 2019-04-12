const Discord = require('discord.js');
const alexaColor = "#31C4F3";
const DndItems = require('./dndDb/dndItems.js');
const DndSpells = require('./dndDb/dndSpells.js');
const DndFeats = require('./dndDb/dndFeats.js');
const DndClassFeats = require('./dndDb/dndClassFeats.js');

const Dnd = {
    dndEmbed: async function (message, finalResult) {
        let resultEmbed = new Discord.RichEmbed();
        let description = "";
        let extraDescription = "";
        let classFeatLevel = 0;

        if (finalResult.feature) {
            classFeatLevel = finalResult._level;
            finalResult = finalResult.feature;
        }

        finalResult.text.forEach((text) => {
            if (text.startsWith("Source: ")) {
                resultEmbed
                    .setFooter(text)
            } else {
                if (description.length < 1750) {
                    description += `${text}\n\n`;
                } else {
                    extraDescription += `${text}\n\n`;
                }
            }
        })

        resultEmbed
            .setColor(alexaColor)
            .setDescription(description)

        if (finalResult.ritual && finalResult.ritual === "NO") {
            resultEmbed.setAuthor(finalResult.name);
        } else if (finalResult.ritual && finalResult.ritual === "YES") {
            resultEmbed.setAuthor(finalResult.name + " (Ritual)");
        } else {
            resultEmbed.setAuthor(finalResult.name);
        }

        if (extraDescription.length > 1) {
            resultEmbed
                .addField("Continued...", extraDescription, false);
        }

        // ITEMS
        if (finalResult.type) {
            let itemType;
            switch(finalResult.type) {
                case "$": itemType = "Currency"; break;
                case "A": itemType = "Ammunition"; break;
                case "G": itemType = "Adventuring Gear"; break;
                case "HA": itemType = "Heavy Armor"; break;
                case "MA": itemType = "Medium Armor"; break;
                case "LA": itemType = "Light Armor"; break;
                case "M": itemType = "Melee Weapon"; break;
                case "R": itemType = "Ranged Weapon"; break;
                case "P": itemType = "Potion"; break;
                case "RD": itemType = "Rod"; break;
                case "RG": itemType = "Ring"; break;
                case "SC": itemType = "Scroll"; break;
                case "ST": itemType = "Staff"; break;
                case "W": itemType = "Wondrous Item"; break;
                case "WD": itemType = "Wand"; break;
                default: itemType = finalResult.type; break;
            }
            resultEmbed.addField("Type", itemType, true)
        }
        if (finalResult.weight) {resultEmbed.addField("Weight", finalResult.weight, true)}

        // SPELLS
        if (finalResult.classes) {resultEmbed.addField("Classes", finalResult.classes, false)}
        if (finalResult.level) {resultEmbed.addField("Spell Level", finalResult.level, true)}
        if (finalResult.school) {resultEmbed.addField("School", finalResult.school, true)}
        if (finalResult.time && finalResult.time.length > 0) {resultEmbed.addField("Time to cast", finalResult.time, true)}
        if (finalResult.range && finalResult.range.length > 0) {resultEmbed.addField("Range", finalResult.range, true)}
        if (finalResult.components && finalResult.components.length > 0) {resultEmbed.addField("Components", finalResult.components, true)}
        if (finalResult.duration && finalResult.duration.length > 0) {resultEmbed.addField("Duration", finalResult.duration, true)}

        // FEATS
        if (finalResult.prerequisite && finalResult.prerequisite.length > 0) {resultEmbed.addField("Prerequisite", finalResult.prerequisite, false);}

        // CLASS FEATS
        if (classFeatLevel > 0) {resultEmbed.addField("Character Level", classFeatLevel, true)}

        message.channel.send(resultEmbed);
    },

    itemLookup: async function (message) {
        let query = message.content.toLowerCase().slice(4);
        let results = [];
        DndItems.forEach((item) => {
            if (item.name.toLowerCase().includes(query)) {
                results.push(item);
            }
        })

        if (results[1]) {
            let choicesEmbed = new Discord.RichEmbed();
            let choices = "";
            let choiceNumber = 1;

            results.forEach((item) => {
                choices += `**${choiceNumber}.)** ${item.name}\n`;
                choiceNumber++;
            })

            choicesEmbed
                .setTitle("There are multiple results. Please respond with the **number** next to the one you were looking for.")
                .setDescription(choices);
            message.channel.send(choicesEmbed);

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 });
            collector.on("collect", response => {
                let responseInt = parseInt(response);
                if (responseInt) {
                    if (results[responseInt - 1]) {
                        let finalResult = results[responseInt - 1];

                        Dnd.dndEmbed(message, finalResult);
                    } else {
                        message.channel.send("It looks like that number wasn't an option. Please try again, starting over.");
                    }
                } else {
                    message.channel.send("I need *just* the number, by itself. Please try again, starting over.");
                }

                collector.stop();
            })
            collector.on("end", (collected, reason) => {
                if (reason === "time") {
                    message.channel.send("You took too much time to respond!")
                } else {return;}
            })
        } else {
            let finalResult = results[0];
            Dnd.dndEmbed(message, finalResult);
        }
    },

    spellLookup: async function (message) {
        let query = message.content.toLowerCase().slice(4);
        let results = [];
        DndSpells.forEach((spell) => {
            if (spell.name.toLowerCase().includes(query)) {
                results.push(spell);
            }
        })

        if (results[1]) {
            let choicesEmbed = new Discord.RichEmbed();
            let choices = "";
            let choiceNumber = 1;

            results.forEach((spell) => {
                choices += `**${choiceNumber}.)** ${spell.name}\n`;
                choiceNumber++;
            })

            choicesEmbed
                .setTitle("There are multiple results. Please respond with the **number** next to the one you were looking for.")
                .setDescription(choices);
            message.channel.send(choicesEmbed);

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 });
            collector.on("collect", response => {
                let responseInt = parseInt(response);
                if (responseInt) {
                    if (results[responseInt - 1]) {
                        let finalResult = results[responseInt - 1];
                        Dnd.dndEmbed(message, finalResult);
                    } else {
                        message.channel.send("It looks like that number wasn't an option. Please try again, starting over.");
                    }
                } else {
                    message.channel.send("I need *just* the number, by itself. Please try again, starting over.");
                }

                collector.stop();
            })
            collector.on("end", (collected, reason) => {
                if (reason === "time") {
                    message.channel.send("You took too much time to respond!")
                } else {return;}
            })
        } else {
            let finalResult = results[0];
            Dnd.dndEmbed(message, finalResult);
        }
    },

    featLookup: async function (message) {
        let query = message.content.toLowerCase().slice(3);
        let results = [];
        DndFeats.forEach((feat) => {
            if (feat.name.toLowerCase().includes(query)) {
                results.push(feat);
            }
        })

        if (results[1]) {
            let choicesEmbed = new Discord.RichEmbed();
            let choices = "";
            let choiceNumber = 1;

            results.forEach((feat) => {
                choices += `**${choiceNumber}.)** ${feat.name}\n`;
                choiceNumber++;
            })

            choicesEmbed
                .setTitle("There are multiple results. Please respond with the **number** next to the one you were looking for.")
                .setDescription(choices);
            message.channel.send(choicesEmbed);

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 });
            collector.on("collect", response => {
                let responseInt = parseInt(response);
                if (responseInt) {
                    if (results[responseInt - 1]) {
                        let finalResult = results[responseInt - 1];
                        Dnd.dndEmbed(message, finalResult);

                    } else {
                        message.channel.send("It looks like that number wasn't an option. Please try again, starting over.");
                    }
                } else {
                    message.channel.send("I need *just* the number, by itself. Please try again, starting over.");
                }

                collector.stop();
            })
            collector.on("end", (collected, reason) => {
                if (reason === "time") {
                    message.channel.send("You took too much time to respond!")
                } else {return;}
            })
        } else {
            let finalResult = results[0];
            Dnd.dndEmbed(message, finalResult);
        }
    },

    classFeatLookup: async function(message, charClass, query) {
        let classObj;
        let results = [];
        DndClassFeats.forEach((thisOne) => {
            if (thisOne.name === charClass) {
                classObj = thisOne;
            } else {
                return;
            }
        })

        classObj.autolevel.forEach((thisOne) => {
            if (thisOne.feature && thisOne.feature.name.toLowerCase().includes(query)) {
                results.push(thisOne);
            }
        })

        if (results[1]) {
            let choicesEmbed = new Discord.RichEmbed();
            let choices = "";
            let choiceNumber = 1;

            results.forEach((classFeat) => {
                choices += `**${choiceNumber}.)** ${classFeat.feature.name}\n`;
                choiceNumber++;
            })

            choicesEmbed
                .setTitle("There are multiple results. Please respond with the **number** next to the one you were looking for.")
                .setDescription(choices);
            message.channel.send(choicesEmbed);

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 });
            collector.on("collect", response => {
                let responseInt = parseInt(response);
                if (responseInt) {
                    if (results[responseInt - 1]) {
                        let finalResult = results[responseInt - 1];
                        Dnd.dndEmbed(message, finalResult);

                    } else {
                        message.channel.send("It looks like that number wasn't an option. Please try again, starting over.");
                    }
                } else {
                    message.channel.send("I need *just* the number, by itself. Please try again, starting over.");
                }

                collector.stop();
            })
            collector.on("end", (collected, reason) => {
                if (reason === "time") {
                    message.channel.send("You took too much time to respond!")
                } else {return;}
            })
        } else {
            let finalResult = results[0];
            Dnd.dndEmbed(message, finalResult);
        }
    }
}

module.exports = Dnd;