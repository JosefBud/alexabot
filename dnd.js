const Discord = require('discord.js');
const alexaColor = "#31C4F3";
const DndItems = require('./dndDb/dndItems.js');
const DndSpells = require('./dndDb/dndSpells.js');
const DndFeats = require('./dndDb/dndFeats.js');

const Dnd = {
    itemLookup: async function (message) {
        let query = message.content.toLowerCase().slice(15);
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
                        let resultEmbed = new Discord.RichEmbed();
                        let description = "";
                        let extraDescription = "";

                        finalResult.text.forEach((text) => {
                            if (text === null) {
                                text = " ";
                            }

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
                            .setAuthor(finalResult.name)
                            .setColor(alexaColor)
                            .setDescription(description)

                        if (extraDescription.length > 1) {
                            resultEmbed
                                .addField("Continued...", extraDescription, false);
                        }

                        resultEmbed
                            .addField("Type", finalResult.type, true)
                            .addField("Weight", finalResult.weight, true)

                        message.channel.send(resultEmbed);

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
            let resultEmbed = new Discord.RichEmbed();
            let description = "";
            let extraDescription = "";

            finalResult.text.forEach((text) => {
                if (text === null) {
                    text = " ";
                }

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
                .setAuthor(finalResult.name)
                .setColor(alexaColor)
                .setDescription(description)

            if (extraDescription.length > 1) {
                resultEmbed
                    .addField("Continued...", extraDescription, false);
            }

            resultEmbed
                .addField("Type", finalResult.type, true)
                .addField("Weight", finalResult.weight, true)

            message.channel.send(resultEmbed);
        }
    },

    spellLookup: async function (message) {
        let query = message.content.toLowerCase().slice(16);
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
                        let resultEmbed = new Discord.RichEmbed();
                        let description = "";
                        let extraDescription = "";

                        finalResult.text.forEach((text) => {
                            if (text === null) {
                                text = " ";
                            }

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

                        if (finalResult.ritual === "NO") {
                            resultEmbed
                                .setAuthor(finalResult.name)
                        } else {
                            resultEmbed
                                .setAuthor(finalResult.name + "*(Ritual)*")
                        }

                        if (extraDescription.length > 1) {
                            resultEmbed
                                .addField("Continued...", extraDescription, false);
                        }

                        resultEmbed
                            .addField("Classes", finalResult.classes, false)
                            .addField("Spell Level", finalResult.level, true)
                            .addField("School", finalResult.school, true)

                        if (finalResult.time.length > 0) {
                            resultEmbed
                                .addField("Time to cast", finalResult.time, true)
                        }

                        if (finalResult.range.length > 0) {
                            resultEmbed
                                .addField("Range", finalResult.range, true)
                        }

                        if (finalResult.components.length > 0) {
                            resultEmbed
                                .addField("Components", finalResult.components, true)
                        }

                        if (finalResult.duration.length > 0) {
                            resultEmbed
                                .addField("Duration", finalResult.duration, true)
                        }

                        message.channel.send(resultEmbed);

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
            let resultEmbed = new Discord.RichEmbed();
            let description = "";
            let extraDescription = "";

            finalResult.text.forEach((text) => {
                if (text === null) {
                    text = " ";
                }

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

            if (finalResult.ritual === "NO") {
                resultEmbed
                    .setAuthor(finalResult.name)
            } else {
                resultEmbed
                    .setAuthor(finalResult.name + "*(Ritual)*")
            }

            if (extraDescription.length > 1) {
                resultEmbed
                    .addField("Continued...", extraDescription, false);
            }

            resultEmbed
                .addField("Classes", finalResult.classes, false)
                .addField("Spell Level", finalResult.level, true)
                .addField("School", finalResult.school, true)

            if (finalResult.time.length > 0) {
                resultEmbed
                    .addField("Time to cast", finalResult.time, true)
            }

            if (finalResult.range.length > 0) {
                resultEmbed
                    .addField("Range", finalResult.range, true)
            }

            if (finalResult.components.length > 0) {
                resultEmbed
                    .addField("Components", finalResult.components, true)
            }

            if (finalResult.duration.length > 0) {
                resultEmbed
                    .addField("Duration", finalResult.duration, true)
            }

            message.channel.send(resultEmbed);
        }
    },

    featLookup: async function (message) {
        let query = message.content.toLowerCase().slice(16);
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
                        let resultEmbed = new Discord.RichEmbed();
                        let description = "";
                        let extraDescription = "";

                        finalResult.text.forEach((text) => {
                            if (text === null) {
                                text = " ";
                            }

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
                            .setAuthor(finalResult.name)

                        if (extraDescription.length > 1) {
                            resultEmbed
                                .addField("Continued...", extraDescription, false);
                        }

                        if (finalResult.prerequisite.length > 0) {
                            resultEmbed.addField("Prerequisite", finalResult.prerequisite, false);
                        }

                        message.channel.send(resultEmbed);

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
            let resultEmbed = new Discord.RichEmbed();
            let description = "";
            let extraDescription = "";

            finalResult.text.forEach((text) => {
                if (text === null) {
                    text = " ";
                }

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
                .setAuthor(finalResult.name)

            if (extraDescription.length > 1) {
                resultEmbed
                    .addField("Continued...", extraDescription, false);
            }

            if (finalResult.prerequisite.length > 0) {
                resultEmbed.addField("Prerequisite", finalResult.prerequisite, false);
            }

            message.channel.send(resultEmbed);
        }
    }
}

module.exports = Dnd;