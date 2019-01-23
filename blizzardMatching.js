const BlizzardMatching = {
    classes: function(response) {
        if (response.data.class === 1) {return "Warrior";}
        if (response.data.class === 2) {return "Paladin";}
        if (response.data.class === 3) {return "Hunter";}
        if (response.data.class === 4) {return "Rogue";}
        if (response.data.class === 5) {return "Priest";}
        if (response.data.class === 6) {return "Death Knight";}
        if (response.data.class === 7) {return "Shaman";}
        if (response.data.class === 8) {return "Mage";}
        if (response.data.class === 9) {return "Warlock";}
        if (response.data.class === 10) {return "Monk";}
        if (response.data.class === 11) {return "Druid";}
        if (response.data.class === 12) {return "Demon Hunter";}
    },

    races: function(response) {
        if (response.data.race === 1) {return "Human";}
        if (response.data.race === 2) {return "Orc";}
        if (response.data.race === 3) {return "Dwarf";}
        if (response.data.race === 4) {return "Night Elf";}
        if (response.data.race === 5) {return "Undead";}
        if (response.data.race === 6) {return "Tauren";}
        if (response.data.race === 7) {return "Gnome";}
        if (response.data.race === 8) {return "Troll";}
        if (response.data.race === 9) {return "Goblin";}
        if (response.data.race === 10) {return "Blood Elf";}
        if (response.data.race === 11) {return "Draenei";}
        if (response.data.race === 22) {return "Worgen";}
        if (response.data.race === 24) {return "Pandaren";}
        if (response.data.race === 25) {return "Pandaren";}
        if (response.data.race === 26) {return "Pandaren";}
        if (response.data.race === 27) {return "Nightborne";}
        if (response.data.race === 28) {return "Highmountain Tauren";}
        if (response.data.race === 29) {return "Void Elf";}
        if (response.data.race === 30) {return "Lightforged Draenei";}
        if (response.data.race === 34) {return "Dark Iron Dwarf";}
        if (response.data.race === 36) {return "Mag'har Orc";}
    },

    faction: function(response) {
        if (response.data.faction === 0) {return "https://malamashka.files.wordpress.com/2016/02/zcvkpoo.png";}
        if (response.data.faction === 1) {return "http://torment-gaming.com/wp-content/uploads/2014/03/HordeLogo.png";}
    },
    
    classColor: function(characterClass) {
        if (characterClass === "Warrior") {return "#C79C6E";}
        if (characterClass === "Paladin") {return "#F58CBA";}
        if (characterClass === "Hunter") {return "#ABD473";}
        if (characterClass === "Rogue") {return "#FFF569";}
        if (characterClass === "Priest") {return "#FFFFFF";}
        if (characterClass === "Death Knight") {return "#C41F3B";}
        if (characterClass === "Shaman") {return "#0070DE";}
        if (characterClass === "Mage") {return "#40C7EB";}
        if (characterClass === "Warlock") {return "#8787ED";}
        if (characterClass === "Monk") {return "#00FF96";}
        if (characterClass === "Druid") {return "#FF7D0A";}
        if (characterClass === "Demon Hunter") {return "#A330C9";}
    }


};

module.exports = BlizzardMatching;