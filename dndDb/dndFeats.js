const DndFeats = [
      {
         "name": "Aberrant Dragon Mark",
         "prerequisite": "No existing dragonmark",
         "text": [
            "You have manifested an aberrant dragonmark. Determine its appearance and the flaw associated with it. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, to a maximum of 20.",
            
            "• Increase your Constitution score by 1, to a maximum of 20.You learn a cantrip from the sorcerer spell list. In addition, choose a 1st-level spell from the sorcerer spell list. You learn that spell and can cast it at its lowest level. Once you cast it, you must finish a long rest before you can cast it again. Constitution is your spellcasting ability for these spells.",
            
            "• Increase your Constitution score by 1, to a maximum of 20.You can increase the power of your aberrant spells at the risk of your own vitality. When you cast a spell with your aberrant mark, you can use one of your Hit Dice to increase the spell’s level by 1. Immediately after you cast the spell, roll the Hit Die. You take damage equal to the number rolled.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Acrobat",
         "prerequisite": "",
         "text": [
            "You become more nimble, gaining the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Acrobatics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• As a bonus action, you can make a DC 15 Dexterity (Acrobatics) check. If you succeed, difficult terrain doesn’t cost you extra movement until the end of the current turn.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "proficiency": "acrobatics",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Acrobat (Proficient)",
         "prerequisite": "",
         "text": [
            "You become more nimble, gaining the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Acrobatics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• As a bonus action, you can make a DC 15 Dexterity (Acrobatics) check. If you succeed, difficult terrain doesn’t cost you extra movement until the end of the current turn.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            },
            {
               "_category": "skills",
               "__text": "Acrobatics+%0"
            }
         ]
      },
      {
         "name": "Actor",
         "prerequisite": "",
         "text": [
            "Skilled at mimicry and dramatics, you gain the following benefits.",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.",
            
            "• You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.",
            
            "Source: Player's Handbook, p. 165"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Alchemist",
         "prerequisite": "",
         "text": [
            "You have studied the secrets of alchemy and are an expert in its practice, gaining the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency with alchemist’s supplies. If you are already proficient with them, you add double your proficiency bonus to checks you make with them.",
            
            "• As an action, you can identify one potion within 5 feet of you, as if you had tasted it. You must see the liquid for this benefit to work.",
            
            "• Over the course of any short rest, you can temporarily improve the potency of one potion of healing of any rarity. To use this benefit, you must have alchemist’s supplies with you, and the potion must be within reach. If the potion is drunk no more than 1 hour after the short rest ends, the creature drinking the potion can forgo the potion’s die roll and regains the maximum number of hit points that the potion can restore.",
            
            "Source: Unearthed Arcana: Feats, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Alert",
         "prerequisite": "",
         "text": [
            "Always on the lookout for danger, you gain the following",
            
            "• You gain a +5 bonus to initiative.",
            
            "• You can't be surprised while you are conscious.",
            
            "• Other creatures don’t gain advantage on attack rolls against you as a result of being unseen by you.",
            
            "Source: Player's Handbook, p. 165"
         ],
         "modifier": [
            {
               "_category": "bonus",
               "__text": "initiative +5"
            }
         ]
      },
      {
         "name": "Animal Handler",
         "prerequisite": "",
         "text": [
            "You master the techniques needed to train and handle animals. You gain the following benefits.",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Animal Handling skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can use a bonus action on your turn to command one friendly beast within 60 feet of you that can hear you and that isn’t currently following the command of someone else. You decide now what action the beast will take and where it will move during its next turn, or you issue a general command that lasts for 1 minute, such as to guard a particular area.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "proficiency": "animal handling",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Animal Handler (Proficient)",
         "prerequisite": "",
         "text": [
            "You master the techniques needed to train and handle animals. You gain the following benefits.",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Animal Handling skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can use a bonus action on your turn to command one friendly beast within 60 feet of you that can hear you and that isn’t currently following the command of someone else. You decide now what action the beast will take and where it will move during its next turn, or you issue a general command that lasts for 1 minute, such as to guard a particular area.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            },
            {
               "_category": "skills",
               "__text": "Animal Handling+%0"
            }
         ]
      },
      {
         "name": "Arcanist",
         "prerequisite": "",
         "text": [
            "You study the arcane arts, gaining the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Arcana skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the prestidigitation and detect magic spells. You can cast detect magic once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "proficiency": "arcana",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Arcanist (Proficient)",
         "prerequisite": "",
         "text": [
            "You study the arcane arts, gaining the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Arcana skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the prestidigitation and detect magic spells. You can cast detect magic once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            },
            {
               "_category": "skills",
               "__text": "Arcana+%0"
            }
         ]
      },
      {
         "name": "Athlete (Dexterity)",
         "prerequisite": "",
         "text": [
            "You have undergone extensive physical training to gain the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• When you are prone, standing up uses only 5 feet of your movement.",
            
            "• Climbing doesn't cost you extra movement.",
            
            "• You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.",
            
            "Source: Player's Handbook, p. 165"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Athlete (Strength)",
         "prerequisite": "",
         "text": [
            "You have undergone extensive physical training to gain the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• When you are prone, standing up uses only 5 feet of your movement.",
            
            "• Climbing doesn't cost you extra movement.",
            
            "• You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.",
            
            "Source: Player's Handbook, p. 165"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Barbed Hide (Charisma)",
         "prerequisite": "Tiefling",
         "text": [
            "One of your ancestors was a barbed devil or other spiky fiend. Barbs protrude from your head. You gain the following benefits:",
            
            "• Increase your Constitution or Charisma score by 1, up to a maximum of 20.",
            
            "• As a bonus action, you can cause small barbs to protrude all over your body or cause them to retract. At the start of each of your turns while the barbs are out, you deal 1d6 piercing damage to any creature grappling you or any creature grappled by you.",
            
            "• You gain proficiency in the Intimidation skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "proficiency": "intimidation",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Barbed Hide (Charisma) (Proficient)",
         "prerequisite": "Tiefling",
         "text": [
            "One of your ancestors was a barbed devil or other spiky fiend. Barbs protrude from your head. You gain the following benefits:",
            
            "• Increase your Constitution or Charisma score by 1, up to a maximum of 20.",
            
            "• As a bonus action, you can cause small barbs to protrude all over your body or cause them to retract. At the start of each of your turns while the barbs are out, you deal 1d6 piercing damage to any creature grappling you or any creature grappled by you.",
            
            "• You gain proficiency in the Intimidation skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "intimidation+%0"
            }
         ]
      },
      {
         "name": "Barbed Hide (Constitution)",
         "prerequisite": "Tiefling",
         "text": [
            "One of your ancestors was a barbed devil or other spiky fiend. Barbs protrude from your head. You gain the following benefits:",
            
            "• Increase your Constitution or Charisma score by 1, up to a maximum of 20.",
            
            "• As a bonus action, you can cause small barbs to protrude all over your body or cause them to retract. At the start of each of your turns while the barbs are out, you deal 1d6 piercing damage to any creature grappling you or any creature grappled by you.",
            
            "• You gain proficiency in the Intimidation skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "proficiency": "intimidation",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Barbed Hide (Constitution) (Proficient)",
         "prerequisite": "Tiefling",
         "text": [
            "One of your ancestors was a barbed devil or other spiky fiend. Barbs protrude from your head. You gain the following benefits:",
            
            "• Increase your Constitution or Charisma score by 1, up to a maximum of 20.",
            
            "• As a bonus action, you can cause small barbs to protrude all over your body or cause them to retract. At the start of each of your turns while the barbs are out, you deal 1d6 piercing damage to any creature grappling you or any creature grappled by you.",
            
            "• You gain proficiency in the Intimidation skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            },
            {
               "_category": "skills",
               "__text": "intimidation+%0"
            }
         ]
      },
      {
         "name": "Blade Mastery",
         "prerequisite": "",
         "text": [
            "You master the shortsword, longsword, scimitar, rapier, and greatsword. You gain the following benefits when using any of them:",
            
            "• You gain a +1 bonus to attack rolls you make with the weapon.",
            
            "• On your turn, you can use your reaction to assume a parrying stance, provided you have the weapon in hand. Doing so grants you a +1 bonus to your AC until the start of your next turn or until you’re not holding the weapon.",
            
            "• When you make an opportunity attack with the weapon, you have advantage on the attack roll.",
            
            "Source: Unearthed Arcana: Feats, p. 2"
         ]
      },
      {
         "name": "Bountiful Luck",
         "prerequisite": "Halfling",
         "text": [
            "Your people have extraordinary luck, which you have learned to mystically lend to your companions when you see them falter. You're not sure how you do it; you just wish it, and it happens. Surely a sign of fortune's favor!",
            "Whenever an ally you can see within 30 feet of you rolls a 1 on the d20 for an attack roll, an ability check, or a saving throw, you can use your reaction to let the ally reroll the die. The ally must use the new roll.",
            "When you use this ability, you can't use your Lucky racial trait before the end of your next turn.",
            
            "Source: Xanathar's Guide to Everything, p. 73"
         ]
      },
      {
         "name": "Brawny",
         "prerequisite": "",
         "text": [
            "You become stronger, gaining the following benefits:",
            
            "• Increase your Strength score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Athletics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You count as if you were one size larger for the purpose of determining your carrying capacity.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "proficiency": "athletics",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Brawny (Proficient)",
         "prerequisite": "",
         "text": [
            "You become stronger, gaining the following benefits:",
            
            "• Increase your Strength score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Athletics skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You count as if you were one size larger for the purpose of determining your carrying capacity.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 1"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            },
            {
               "_category": "skills",
               "__text": "Athletics+%0"
            }
         ]
      },
      {
         "name": "Burglar",
         "prerequisite": "",
         "text": [
            "You pride yourself on your quickness and your close study of certain clandestine activities. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with thieves’ tools. If you are already proficient with them, you add double your proficiency bonus to checks you make with them.",
            
            "Source: Unearthed Arcana: Feats, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Charger",
         "prerequisite": "",
         "text": [
            "When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature.",
            "If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack's damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed).",
            
            "Source: Player's Handbook, p. 165"
         ]
      },
      {
         "name": "Critter Friend",
         "prerequisite": "Gnome (forest)",
         "text": [
            "Your friendship with animals mystically deepens. You gain the following benefits:",
            
            "• You gain proficiency in the Animal Handling skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "• You learn the speak with animals spell and can cast it at will, without expending a spell slot. You also learn the animal friendship spell, and you can cast it once with this feat, without expending a spell slot. You regain the ability to cast it in this way when you finish a long rest. Intelligence is your spellcasting ability for these spells.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "proficiency": "animal handling"
      },
      {
         "name": "Critter Friend (Proficient)",
         "prerequisite": "Gnome (forest)",
         "text": [
            "Your friendship with animals mystically deepens. You gain the following benefits:",
            
            "• You gain proficiency in the Animal Handling skill. If you’re already proficient in it, your proficiency bonus is doubled for any check you make with it.",
            
            "• You learn the speak with animals spell and can cast it at will, without expending a spell slot. You also learn the animal friendship spell, and you can cast it once with this feat, without expending a spell slot. You regain the ability to cast it in this way when you finish a long rest. Intelligence is your spellcasting ability for these spells.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 1"
         ],
         "modifier": [
            {
               "_category": "skills",
               "__text": "animal handling+%0"
            }
         ]
      },
      {
         "name": "Crossbow Expert",
         "prerequisite": "",
         "text": [
            "Thanks to extensive practice with the crossbow, you gain the following benefits.",
            
            "• You ignore the loading quality of crossbows with which you are proficient.",
            
            "• Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls.",
            
            "• When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a hand crossbow you are holding.",
            
            "Source: Player's Handbook, p. 165"
         ]
      },
      {
         "name": "Defensive Duelist",
         "prerequisite": "Dexterity 13 or higher",
         "text": [
            "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
            
            "Source: Player's Handbook, p. 165"
         ]
      },
      {
         "name": "Diplomat",
         "prerequisite": "",
         "text": [
            "You master the arts of diplomacy, gaining the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Persuasion skill. If you are already proficient in this skill, you add double your proficiency bonus to checks you make with it.",
            
            "• If you spend 1 minute talking to someone who can understand what you say, you can make a Charisma (Persuasion) check contested by the creature’s Wisdom (Insight) check. If you or your companions are fighting the creature, your check automatically fails. If your check succeeds, the target is charmed by you as long as it remains within 60 feet of you and for 1 minute thereafter.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "persuasion",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Diplomat (Proficient)",
         "prerequisite": "",
         "text": [
            "You master the arts of diplomacy, gaining the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Persuasion skill. If you are already proficient in this skill, you add double your proficiency bonus to checks you make with it.",
            
            "• If you spend 1 minute talking to someone who can understand what you say, you can make a Charisma (Persuasion) check contested by the creature’s Wisdom (Insight) check. If you or your companions are fighting the creature, your check automatically fails. If your check succeeds, the target is charmed by you as long as it remains within 60 feet of you and for 1 minute thereafter.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Persuasion+%0"
            }
         ]
      },
      {
         "name": "Dragon Fear (Charisma)",
         "prerequisite": "Dragonborn",
         "text": [
            "When angered, you radiate menace. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• Instead of exhaling destructive energy, you can expend a use of your Breath Weapon trait to roar, forcing each creature of your choice within 30 feet of you to make a Wisdom saving throw (DC 8 + your proficiency bonus + your Charisma modifier). A target automatically succeeds if it can’t hear or see you. On a failed save, a target becomes frightened for 1 minute. If the frightened target takes any damage, it can repeat the saving throw, ending the effect on itself on a success.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Dragon Fear (Constitution)",
         "prerequisite": "Dragonborn",
         "text": [
            "When angered, you radiate menace. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, up to a maximum of 20.",
            
            "• Instead of exhaling destructive energy, you can expend a use of your Breath Weapon trait to roar, forcing each creature of your choice within 30 feet of you to make a Wisdom saving throw (DC 8 + your proficiency bonus + your Charisma modifier). A target automatically succeeds if it can’t hear or see you. On a failed save, a target becomes frightened for 1 minute. If the frightened target takes any damage, it can repeat the saving throw, ending the effect on itself on a success.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Dragon Fear (Strength)",
         "prerequisite": "Dragonborn",
         "text": [
            "When angered, you radiate menace. You gain the following benefits:",
            
            "• Increase your Strength score by 1, up to a maximum of 20.",
            
            "• Instead of exhaling destructive energy, you can expend a use of your Breath Weapon trait to roar, forcing each creature of your choice within 30 feet of you to make a Wisdom saving throw (DC 8 + your proficiency bonus + your Charisma modifier). A target automatically succeeds if it can’t hear or see you. On a failed save, a target becomes frightened for 1 minute. If the frightened target takes any damage, it can repeat the saving throw, ending the effect on itself on a success.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Dragon Hide (Charisma)",
         "prerequisite": "Dragonborn",
         "text": [
            "You manifest scales and claws reminiscent of your draconic ancestors. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• Your scales harden; while you aren't wearing armor, you can calculate your AC as 13 + your Dexterity modifier. You can use a shield and still gain this benefit.",
            
            "• You grow retractable claws from the tips of your fingers. Extending or retracting the claws requires no action. The claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Dragon Hide (Constitution)",
         "prerequisite": "Dragonborn",
         "text": [
            "You manifest scales and claws reminiscent of your draconic ancestors. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, up to a maximum of 20.",
            
            "• Your scales harden; while you aren't wearing armor, you can calculate your AC as 13 + your Dexterity modifier. You can use a shield and still gain this benefit.",
            
            "• You grow retractable claws from the tips of your fingers. Extending or retracting the claws requires no action. The claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Dragon Hide (Strength)",
         "prerequisite": "Dragonborn",
         "text": [
            "You manifest scales and claws reminiscent of your draconic ancestors. You gain the following benefits:",
            
            "• Increase your Strength score by 1, up to a maximum of 20.",
            
            "• Your scales harden; while you aren't wearing armor, you can calculate your AC as 13 + your Dexterity modifier. You can use a shield and still gain this benefit.",
            
            "• You grow retractable claws from the tips of your fingers. Extending or retracting the claws requires no action. The claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Dragon Wings",
         "prerequisite": "Dragonborn",
         "text": [
            "You sprout draconic wings. With your wings, you have a flying speed of 20 feet if you aren’t wearing heavy armor and aren’t exceeding your carrying capacity.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 2"
         ]
      },
      {
         "name": "Dragonmark of Detection",
         "prerequisite": "half-elf",
         "text": [
            "Your have the magical mark of Detection, the dragonmark of House Medani, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Wisdom as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: detect magic, mage hand",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: detect thoughts",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: clairvoyance",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Finding",
         "prerequisite": "half-orc or human",
         "text": [
            "Your have the magical mark of Finding, the dragonmark of House Tharashk, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Wisdom as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: identify, mage hand",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: locate object",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: clairvoyance",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Handling",
         "prerequisite": "human",
         "text": [
            "Your have the magical mark of Handling, the dragonmark of House Vadalis, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Wisdom as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: druidcraft, speak with animals",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: beast sense",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: conjure animals",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Healing",
         "prerequisite": "halfling",
         "text": [
            "Your have the magical mark of Healing, the dragonmark of House Jorasco, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Wisdom as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: cure wounds, spare the dying",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: lesser restoration",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: revivify",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Hospitality",
         "prerequisite": "halfling",
         "text": [
            "Your have the magical mark of Hospitality, the dragonmark of House Ghallanda, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Charisma as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: friends, unseen servant",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: rope trick",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: Leomund's tiny hut",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Making",
         "prerequisite": "human",
         "text": [
            "Your have the magical mark of Making, the dragonmark of House Cannith, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Intelligence as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: identify, mending",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: magic weapon",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: fabricate",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Passage",
         "prerequisite": "human",
         "text": [
            "Your have the magical mark of Passage, the dragonmark of House Orien, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Intelligence as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: expeditious retreat, light",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: misty step",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: teleportation circle",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Scribing",
         "prerequisite": "gnome",
         "text": [
            "Your have the magical mark of Scribing, the dragonmark of House Sivis, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Intelligence as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: comprehend languages, message",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: sending",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: tongues",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Sentinel",
         "prerequisite": "human",
         "text": [
            "Your have the magical mark of Sentinel, the dragonmark of House Deneith, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Wisdom as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: blade ward, compelled duel",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: blur",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: protection from energy",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Shadow",
         "prerequisite": "elf",
         "text": [
            "Your have the magical mark of Shadow, the dragonmark of House Phiarlan and House Thuranni, and are a member of one of those houses.",
            "You gain the ability to innately cast spells and cantrips, using Charisma as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: dancing lights, disguise self",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: darkness",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: nondetection",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Storm",
         "prerequisite": "half-elf",
         "text": [
            "Your have the magical mark of Storm, the dragonmark of House Lyrander, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Intelligence as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: fog cloud, shocking grasp",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: gust of wind",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: sleet storm",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Dragonmark of Warding",
         "prerequisite": "dwarf",
         "text": [
            "Your have the magical mark of Warding, the dragonmark of House Kundarak, and are a member of that house.",
            "You gain the ability to innately cast spells and cantrips, using Intelligence as your spellcasting ability. You cast each spell at its lowest level. Once you cast a given spell this way, you must finish a long rest before you can cast it innately again. You must still expend any material components. Your dragonmark confers the following benefits.",
            
            "Least Dragonmark:",
            "When you first take this feat, you gain the least dragonmark. You learn the following spells: alarm, resistance",
            
            "Lesser Dragonmark:",
            "At 5th level and higher, your mark becomes more potent, improving to lesser dragonmark. You learn the following spell: arcane lock",
            
            "Greater Dragonmark:",
            "At 9th level and higher, your mark's power increases again, becoming a greater dragonmark. You learn the following spell: magic circle",
            
            "Source: Unearthed Arcana - Eberron, p. 5"
         ]
      },
      {
         "name": "Drow High Magic",
         "prerequisite": "Elf (drow)",
         "text": [
            "You learn more of the spells typical of dark elves. You learn the detect magic spell and can cast it at will, without expending a spell slot. You also learn levitate and dispel magic, each of which you can cast once without expending a spell slot. You regain the ability to cast those two spells in this way when you finish a long rest. Charisma is your spellcasting ability for all three spells.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ]
      },
      {
         "name": "Dual Wielder",
         "prerequisite": "",
         "text": [
            "You master fighting with two weapons, gaining the following benefits.",
            
            "• You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.",
            
            "• You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren't light.",
            
            "• You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.",
            
            "Source: Player's Handbook, p. 165"
         ]
      },
      {
         "name": "Dungeon Delver",
         "prerequisite": "",
         "text": [
            "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits.",
            
            "• You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.",
            
            "• You have advantage on saving throws made to avoid or resist traps.",
            
            "• You have resistance to the damage dealt by traps.",
            
            "• You can search for traps while traveling at a normal pace, instead of only at a slow pace.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Durable",
         "prerequisite": "",
         "text": [
            "Hardy and resilient, you gain the following benefits.",
            
            "• Increase your Constitution score by 1, to a maximum of 20.",
            
            "• When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2).",
            
            "Source: Player's Handbook, p. 166"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Dwarven Fortitude",
         "prerequisite": "Dwarf",
         "text": [
            "You have the blood of dwarf heroes flowing through your veins. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, to a maximum of 20.",
            
            "• Whenever you take the Dodge action in combat, you can spend one Hit Die to heal yourself. Roll the die, add your Constitution modifier, and regain a number of hit points equal to the total (minimum of 1).",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Elemental Adept (Acid)",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "Spells you cast ignore acid resistance. In addition, when you roll damage for a spell you cast that deals acid damage, you can treat any 1 on a damage die as a 2.",
            "You can select this feat multiple times. Each time you do so, you must choose a different damage type.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Elemental Adept (Cold)",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "Spells you cast ignore cold resistance. In addition, when you roll damage for a spell you cast that deals cold damage, you can treat any 1 on a damage die as a 2.",
            "You can select this feat multiple times. Each time you do so, you must choose a different damage type.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Elemental Adept (Fire)",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "Spells you cast ignore fire resistance. In addition, when you roll damage for a spell you cast that deals fire damage, you can treat any 1 on a damage die as a 2.",
            "You can select this feat multiple times. Each time you do so, you must choose a different damage type.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Elemental Adept (Lightning)",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "Spells you cast ignore lightining resistance. In addition, when you roll damage for a spell you cast that deals lightning damage, you can treat any 1 on a damage die as a 2.",
            "You can select this feat multiple times. Each time you do so, you must choose a different damage type.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Elemental Adept (Thunder)",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "Spells you cast ignore thunder resistance. In addition, when you roll damage for a spell you cast that deals thunder damage, you can treat any 1 on a damage die as a 2.",
            "You can select this feat multiple times. Each time you do so, you must choose a different damage type.",
            
            "Source: Player's Handbook, p. 166"
         ]
      },
      {
         "name": "Elven Accuracy (Charisma)",
         "prerequisite": "Elf",
         "text": [
            "The accuracy of elves is legendary, especially that of elf archers and spellcasters. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Elven Accuracy (Dexterity)",
         "prerequisite": "Elf",
         "text": [
            "The accuracy of elves is legendary, especially that of elf archers and spellcasters. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Elven Accuracy (Intelligence)",
         "prerequisite": "Elf",
         "text": [
            "The accuracy of elves is legendary, especially that of elf archers and spellcasters. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Elven Accuracy (Wisdom)",
         "prerequisite": "Elf",
         "text": [
            "The accuracy of elves is legendary, especially that of elf archers and spellcasters. You gain the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Empathic",
         "prerequisite": "",
         "text": [
            "You possess keen insight into how other people think and feel. You gain the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Insight skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can use your action to try to get uncanny insight about one humanoid you can see within 30 feet of you. Make a Wisdom (Insight) check contested by the target’s Charisma (Deception) check. If your check succeeds, you have advantage on attack rolls and ability checks against the target until the end of your next turn.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "insight",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Empathic (Proficient)",
         "prerequisite": "",
         "text": [
            "You possess keen insight into how other people think and feel. You gain the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Insight skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can use your action to try to get uncanny insight about one humanoid you can see within 30 feet of you. Make a Wisdom (Insight) check contested by the target’s Charisma (Deception) check. If your check succeeds, you have advantage on attack rolls and ability checks against the target until the end of your next turn.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            },
            {
               "_category": "skills",
               "__text": "Insight+%0"
            }
         ]
      },
      {
         "name": "Everybody's Friend",
         "prerequisite": "Half-Elf",
         "text": [
            "You develop your magnetic personality to ease your way through the world. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• You gain proficiency in the Deception and Persuasion skills. If you’re already proficient in either skill, your proficiency bonus is doubled for any check you make with that skill.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 2"
         ],
         "proficiency": "deception, persuasion",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Everybody's Friend (Proficient in Both)",
         "prerequisite": "Half-Elf",
         "text": [
            "You develop your magnetic personality to ease your way through the world. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• You gain proficiency in the Deception and Persuasion skills. If you’re already proficient in either skill, your proficiency bonus is doubled for any check you make with that skill.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Deception+%0"
            },
            {
               "_category": "skills",
               "__text": "Persuasion+%0"
            }
         ]
      },
      {
         "name": "Everybody's Friend (Proficient in Deception)",
         "prerequisite": "Half-Elf",
         "text": [
            "You develop your magnetic personality to ease your way through the world. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• You gain proficiency in the Deception and Persuasion skills. If you’re already proficient in either skill, your proficiency bonus is doubled for any check you make with that skill.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 2"
         ],
         "proficiency": "persuasion",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Deception+%0"
            }
         ]
      },
      {
         "name": "Everybody's Friend (Proficient in Perusasion)",
         "prerequisite": "Half-Elf",
         "text": [
            "You develop your magnetic personality to ease your way through the world. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, up to a maximum of 20.",
            
            "• You gain proficiency in the Deception and Persuasion skills. If you’re already proficient in either skill, your proficiency bonus is doubled for any check you make with that skill.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 2"
         ],
         "proficiency": "persuasion",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Persuasion+%0"
            }
         ]
      },
      {
         "name": "Fade Away (Dexterity)",
         "prerequisite": "Gnome",
         "text": [
            "You can draw on your magical heritage to escape danger. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, up to a maximum of 20.",
            
            "• Immediately after you take damage, you can use a reaction to magically become invisible until the end of your next turn or until you attack, deal damage, or force someone to make a saving throw. Once you use this ability, you can’t do so again until you finish a short or long rest.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Fade Away (Intelligence)",
         "prerequisite": "Gnome",
         "text": [
            "You can draw on your magical heritage to escape danger. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, up to a maximum of 20.",
            
            "• Immediately after you take damage, you can use a reaction to magically become invisible until the end of your next turn or until you attack, deal damage, or force someone to make a saving throw. Once you use this ability, you can’t do so again until you finish a short or long rest.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Fell Handed",
         "prerequisite": "",
         "text": [
            "You master the handaxe, battleaxe, greataxe, warhammer, and maul. You gain the following benefits when using any of them:",
            
            "• You gain a +1 bonus to attack rolls you make with the weapon.",
            
            "• Whenever you have advantage on a melee attack roll you make with the weapon and hit, you can knock the target prone if the lower of the two d20 rolls would also hit the target.",
            
            "• Whenever you have disadvantage on a melee attack roll you make with the weapon, the target takes bludgeoning damage equal to your Strength modifier (minimum of 0) if the attack misses but the higher of the two d20 rolls would have hit.",
            
            "• If you use the Help action to aid an ally’s melee attack while you’re wielding the weapon, you knock the target’s shield aside momentarily. In addition to the ally gaining advantage on the attack roll, the ally gains a +2 bonus to the roll if the target is using a shield.",
            
            "Prone:",
            "• A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
            
            "• The creature has disadvantage on attack rolls.",
            
            "• An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.",
            
            "Source: Unearthed Arcana: Feats, p. 2"
         ]
      },
      {
         "name": "Fey Teleportation (Charisma)",
         "prerequisite": "Elf (high)",
         "text": [
            "Your study of high elven lore has unlocked fey power that few other elves possess, except your eladrin cousins. Drawing on your fey ancestry, you can momentarily stride through the Feywild to shorten your path from one place to another. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You learn to speak, read, and write Sylvan.",
            
            "•  You learn the misty step spell and can cast it once without expending a spell slot. You regain the ability to cast it in this way when you finish a short or long rest. Intelligence is your spellcasting ability for this spell.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Fey Teleportation (Intelligence)",
         "prerequisite": "Elf (high)",
         "text": [
            "Your study of high elven lore has unlocked fey power that few other elves possess, except your eladrin cousins. Drawing on your fey ancestry, you can momentarily stride through the Feywild to shorten your path from one place to another. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You learn to speak, read, and write Sylvan.",
            
            "•  You learn the misty step spell and can cast it once without expending a spell slot. You regain the ability to cast it in this way when you finish a short or long rest. Intelligence is your spellcasting ability for this spell.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Flail Mastery",
         "prerequisite": "",
         "text": [
            "The flail is a tricky weapon to use, but you have spent countless hours mastering it. You gain the following benefits.",
            
            "• You gain a +1 bonus to attack rolls you make with a flail.",
            
            "• As a bonus action on your turn, you can prepare yourself to extend your flail to sweep over targets’ shields. Until the end of this turn, your attack rolls with a flail gain a +2 bonus against any target using a shield.",
            
            "• When you hit with an opportunity attack using a flail, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone.",
            
            "Prone:",
            "• A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
            
            "• The creature has disadvantage on attack rolls.",
            
            "• An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.",
            
            "Source: Unearthed Arcana: Feats, p. 3"
         ]
      },
      {
         "name": "Flames of Phlegethos (Charisma)",
         "prerequisite": "Tiefling",
         "text": [
            "You learn to call on hellfire to serve your commands. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• When you roll fire damage for a spell you cast, you can reroll any roll of 1 on the fire damage dice, but you must use the new roll, even if it is another 1.",
            
            "• Whenever you cast a spell that deals fire damage, you can cause flames to wreathe you until the end of your next turn. The flames don’t harm you or your possessions, and they shed bright light out to 30 feet and dim light for an additional 30 feet. While the flames are present, any creature within 5 feet of you that hits you with a melee attack takes 1d4 fire damage.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Flames of Phlegethos (Intelligence)",
         "prerequisite": "Tiefling",
         "text": [
            "You learn to call on hellfire to serve your commands. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• When you roll fire damage for a spell you cast, you can reroll any roll of 1 on the fire damage dice, but you must use the new roll, even if it is another 1.",
            
            "• Whenever you cast a spell that deals fire damage, you can cause flames to wreathe you until the end of your next turn. The flames don’t harm you or your possessions, and they shed bright light out to 30 feet and dim light for an additional 30 feet. While the flames are present, any creature within 5 feet of you that hits you with a melee attack takes 1d4 fire damage.",
            
            "Source: Xanathar's Guide to Everything, p. 74"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Gourmand",
         "prerequisite": "",
         "text": [
            "You have mastered a variety of special recipes, allowing you to prepare exotic dishes with useful effects. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, to a maximum of 20.",
            
            "• You gain proficiency with cook’s utensils. If you are already proficient with them, you add double your proficiency bonus to checks you make with them.",
            
            "• As an action, you can inspect a drink or plate of food within 5 feet of you and determine whether it is poisoned, provided that you can see and smell it.",
            
            "• During a long rest, you can prepare and serve a meal that helps you and your allies recover from the rigors of adventuring, provided you have suitable food, cook’s utensils, and other supplies on hand. The meal serves up to six people, and each person who eats it regains two additional Hit Dice at the end of the long rest. In addition, those who partake of the meal have advantage on Constitution saving throws against disease for the next 24 hours.",
            
            "Source: Unearthed Arcana: Feats, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Grappler",
         "prerequisite": "Strength 13 or higher",
         "text": [
            "You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits.",
            
            "• You have advantage on attack rolls against a creature you are grappling.",
            
            "• You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.",
            
            "Restrained:",
            "• A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
            
            "• Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
            
            "• The creature has disadvantage on Dexterity saving throws.",
            
            "Source: Player's Handbook, p. 167"
         ]
      },
      {
         "name": "Great Weapon Master",
         "prerequisite": "",
         "text": [
            "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits.",
            
            "• On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.",
            
            "• Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.",
            
            "Source: Player's Handbook, p. 167"
         ]
      },
      {
         "name": "Greater Mark of Detection",
         "prerequisite": "8th level, must possess Mark of Detection",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Charisma or Intelligence by 1, to a maximum of 20.",
            
            "• You learn see invisibilityand true seeing, each of which you can cast once without expending a spell slot or using a material component. Intelligence is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Finding",
         "prerequisite": "8th level, must possess Mark of Finding",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity, Strength, or Wisdom by 1, to a maximum of 20.",
            
            "• You learn locate creature and find the path, each of which you can cast once without expending a spell slot or using a material component. Wisdom is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Handling",
         "prerequisite": "8th level, must possess Mark of Handling",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity or Wisdom by 1, to a maximum of 20.",
            
            "• You learn beast sense and dominate beast, each of which you can cast once without expending a spell slot or using a material component. Wisdom is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Healing",
         "prerequisite": "8th level, must possess Mark of Healing",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity or Wisdom by 1, to a maximum of 20.",
            
            "• You learn mass healing word and greater restoration, each of which you can cast once without expending a spell slot or using a material component. Wisdom is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Hospitality",
         "prerequisite": "8th level, must possess Mark of Hospitality",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Charisma or Dexterity by 1, to a maximum of 20.",
            
            "• You learn sanctuary and Mordenkainen's magnificent mansion, each of which you can cast once without expending a spell slot or using a material component. Charisma is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Making",
         "prerequisite": "8th level, must possess Mark of Making",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity or Intelligence by 1, to a maximum of 20.",
            
            "• You learn fabricate and creation, each of which you can cast once without expending a spell slot or using a material component. Intelligence is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Passage",
         "prerequisite": "8th level, must possess Mark of Passage",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity or Constitution by 1, to a maximum of 20.",
            
            "• You learn blink and teleportation circle, each of which you can cast once without expending a spell slot or using a material component. Constitution is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Scribing",
         "prerequisite": "8th level, must possess Mark of Scribing",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Intelligence or Charisma by 1, to a maximum of 20.",
            
            "• You learn sending and tongues, each of which you can cast once without expending a spell slot or using a material component. Intelligence is your spellcasting ability for these spells. You must complete a long or short rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Sentinel",
         "prerequisite": "8th level, must possess Mark of Sentinel",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Strength or Wisdom by 1, to a maximum of 20.",
            
            "• You learn compelled duel and warding bond, each of which you can cast once without expending a spell slot or using a material component. Wisdom is your spellcasting ability for these spells. You must complete a long or short rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Shadow",
         "prerequisite": "8th level, must possess Mark of Shadow",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Charisma or Dexterity by 1, to a maximum of 20.",
            
            "• You learn nondetection and mislead, each of which you can cast once without expending a spell slot or using a material component. Charisma is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Storm",
         "prerequisite": "8th level, must possess Mark of Storm",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Charisma or Dexterity by 1, to a maximum of 20.",
            
            "• You learn control water and control winds, each of which you can cast once without expending a spell slot or using a material component. Charisma is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Greater Mark of Warding",
         "prerequisite": "8th level, must possess Mark of Warding",
         "text": [
            "Your dragonmark has grown in size and power. This enhances your existing dragonmark, and the benefits are based on the mark that you already possess. A greater dragonmark provides the following benefits:",
            
            "• The die type of your dragonmarked Intuition Die increases by one (for example, from a d4 to a d6).",
            
            "• Increase either your Dexterity or Intelligence by 1, to a maximum of 20.",
            
            "• You learn knock, glyph of warding, and Leomund's secret chest, each of which you can cast once without expending a spell slot or using a material component. Intelligence is your spellcasting ability for these spells. You must complete a long rest to regain the use of these spells.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 4"
         ]
      },
      {
         "name": "Grudge-Bearer (Constitution)",
         "prerequisite": "Dwarf",
         "text": [
            "You have a deep hatred for a particular kind of creature. Choose your foes, a type of creature to bear the burden of your wrath: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can choose two races of humanoid (such as gnolls and orcs). You gain the following benefits:",
            
            "• Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
            
            "• During the first round of any combat against your chosen foes, your attack rolls against any of them have advantage.",
            
            "• When any of your chosen foes makes an opportunity attack against you, it makes the attack roll with disadvantage.",
            
            "• Whenever you make an Intelligence (Arcana, History, Nature, or Religion) check to recall information about your chosen foes, you add double your proficiency bonus to the check, even if you’re not normally proficient.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Grudge-Bearer (Strength)",
         "prerequisite": "Dwarf",
         "text": [
            "You have a deep hatred for a particular kind of creature. Choose your foes, a type of creature to bear the burden of your wrath: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can choose two races of humanoid (such as gnolls and orcs). You gain the following benefits:",
            
            "• Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
            
            "• During the first round of any combat against your chosen foes, your attack rolls against any of them have advantage.",
            
            "• When any of your chosen foes makes an opportunity attack against you, it makes the attack roll with disadvantage.",
            
            "• Whenever you make an Intelligence (Arcana, History, Nature, or Religion) check to recall information about your chosen foes, you add double your proficiency bonus to the check, even if you’re not normally proficient.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Grudge-Bearer (Wisdom)",
         "prerequisite": "Dwarf",
         "text": [
            "You have a deep hatred for a particular kind of creature. Choose your foes, a type of creature to bear the burden of your wrath: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can choose two races of humanoid (such as gnolls and orcs). You gain the following benefits:",
            
            "• Increase your Strength, Constitution, or Wisdom score by 1, to a maximum of 20.",
            
            "• During the first round of any combat against your chosen foes, your attack rolls against any of them have advantage.",
            
            "• When any of your chosen foes makes an opportunity attack against you, it makes the attack roll with disadvantage.",
            
            "• Whenever you make an Intelligence (Arcana, History, Nature, or Religion) check to recall information about your chosen foes, you add double your proficiency bonus to the check, even if you’re not normally proficient.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Healer",
         "prerequisite": "",
         "text": [
            "You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits.",
            
            "• When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.",
            
            "• As an action, you can spend one use of a healer's kit to tend to a creature and restore 1d6+4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest.",
            
            "Source: Player's Handbook, p. 167"
         ]
      },
      {
         "name": "Heavily Armored",
         "prerequisite": "Proficiency with medium armor",
         "text": [
            "You have trained to master the use of heavy armor, gaining the following benefits.",
            
            "• Increase your Strength score by 1, to a maximum of 20.",
            
            "• You gain proficiency with heavy armor.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Heavy Armor Master",
         "prerequisite": "Proficiency with heavy armor",
         "text": [
            "You can use your armor to deflect strikes that would kill others. You gain the following benefits.",
            
            "• Increase your Strength score by 1, to a maximum of 20.",
            
            "• While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical weapons is reduced by 3.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Historian",
         "prerequisite": "",
         "text": [
            "Your study of history rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the History skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• When you take the Help action to aid another creature’s ability check, you can make a DC 15 Intelligence (History) check. On a success, that creature’s check gains a bonus equal to your proficiency bonus, as you share pertinent advice and historical examples. To receive this bonus, the creature must be able to understand what you’re saying.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "history",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Historian (Proficient)",
         "prerequisite": "",
         "text": [
            "Your study of history rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the History skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• When you take the Help action to aid another creature’s ability check, you can make a DC 15 Intelligence (History) check. On a success, that creature’s check gains a bonus equal to your proficiency bonus, as you share pertinent advice and historical examples. To receive this bonus, the creature must be able to understand what you’re saying.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            },
            {
               "_category": "skills",
               "__text": "History+%0"
            }
         ]
      },
      {
         "name": "Human Determination (Charisma)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Human Determination (Constitution)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Human Determination (Dexterity)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Human Determination (Intelligence)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Human Determination (Strength)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Human Determination (Wisdom)",
         "prerequisite": "Human",
         "text": [
            "You are filled with a determination that can draw the unreachable within your reach. You gain the following benefits:",
            
            "• Increase one ability score of your choice by 1, to a maximum of 20.",
            
            "• When you make an attack roll, an ability check, or a saving throw, you can do so with advantage. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Infernal Constitution",
         "prerequisite": "Tiefling",
         "text": [
            "Fiendish blood runs strong in you, unlocking a resilience akinto that possessed by some fiends. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, up to a maximum of 20.",
            
            "• You have resistance to cold and poison damage.",
            
            "• You have advantage on saving throws against being poisoned.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Inspiring Leader",
         "prerequisite": "Charisma 13 or higher",
         "text": [
            "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
            
            "Source: Player's Handbook, p. 167"
         ]
      },
      {
         "name": "Investigator",
         "prerequisite": "",
         "text": [
            "You have an eye for detail and can pick out the smallest clues. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Investigation skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can take the Search action as a bonus action.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "investigation",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Investigator (Proficient)",
         "prerequisite": "",
         "text": [
            "You have an eye for detail and can pick out the smallest clues. You gain the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Investigation skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You can take the Search action as a bonus action.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            },
            {
               "_category": "skills",
               "__text": "Investigation+%0"
            }
         ]
      },
      {
         "name": "Keen Mind",
         "prerequisite": "",
         "text": [
            "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits.",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You always know which way is north.",
            
            "• You always know the number of hours left before the next sunrise or sunset.",
            
            "• You can accurately recall anything you have seen or heard within the past month.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Lightly Armored (Dexterity)",
         "prerequisite": "",
         "text": [
            "You have trained to master the use of light armor, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with light armor.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Lightly Armored (Strength)",
         "prerequisite": "",
         "text": [
            "You have trained to master the use of light armor, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with light armor.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Linguist",
         "prerequisite": "",
         "text": [
            "You have studied languages and codes, gaining the following benefits.",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You learn three languages of your choice.",
            
            "• You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic to decipher it.",
            
            "Source: Player's Handbook, p. 167"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Lucky",
         "prerequisite": "",
         "text": [
            "You have inexplicable luck that seems to kick in at just the right moment.",
            "You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.",
            "You can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.",
            "You regain your expended luck points when you finish a long rest.",
            
            "Source: Player's Handbook, p. 167"
         ]
      },
      {
         "name": "Mage Slayer",
         "prerequisite": "",
         "text": [
            "You have practiced techniques useful in melee combat against spellcasters, gaining the following benefits.",
            
            "• When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.",
            
            "• When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.",
            
            "• You have advantage on saving throws against spells cast by creatures within 5 feet of you.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Bard)",
         "prerequisite": "",
         "text": [
            "You learn two bard cantrips of your choice.",
            "In addition, choose one 1st-level bard spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Charisma.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Cleric)",
         "prerequisite": "",
         "text": [
            "You learn two cleric cantrips of your choice.",
            "In addition, choose one 1st-level cleric spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Wisdom.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Druid)",
         "prerequisite": "",
         "text": [
            "You learn two druid cantrips of your choice.",
            "In addition, choose one 1st-level druid spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Wisdom.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Sorcerer)",
         "prerequisite": "",
         "text": [
            "You learn two sorcerer cantrips of your choice.",
            "In addition, choose one 1st-level sorcerer spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Charisma.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Warlock)",
         "prerequisite": "",
         "text": [
            "You learn two warlock cantrips of your choice.",
            "In addition, choose one 1st-level warlock spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Charisma.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Magic Initiate (Wizard)",
         "prerequisite": "",
         "text": [
            "You learn two wizard cantrips of your choice.",
            "In addition, choose one 1st-level wizard spell to learn. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
            "Your spellcasting ability for these spells is Intelligence.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Martial Adept",
         "prerequisite": "",
         "text": [
            "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:",
            
            "• You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver’s effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).",
            
            "• You gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Master of Disguise",
         "prerequisite": "",
         "text": [
            "You have honed your ability to shape your personality and to read the personalities of others. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency with the disguise kit. If you are already proficient with it, you add double your proficiency bonus to checks you make with it.",
            
            "• If you spend 1 hour observing a creature, you can then spend 8 hours crafting a disguise you can quickly don to mimic that creature. Making the disguise requires a disguise kit. You must make checks as normal to disguise yourself, but you can assume the disguise as an action.",
            
            "Source: Unearthed Arcana: Feats, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Medic",
         "prerequisite": "",
         "text": [
            "You master the physician’s arts, gaining the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Medicine skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• During a short rest, you can clean and bind the wounds of up to six willing beasts and humanoids. Make a DC 15 Wisdom (Medicine) check for each creature. On a success, if a creature spends a Hit Die during this rest, that creature can forgo the roll and instead regain the maximum number of hit points the die can restore. A creature can do so only once per rest, regardless of how many Hit Dice it spends.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "medicine",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Medic (Proficient)",
         "prerequisite": "",
         "text": [
            "You master the physician’s arts, gaining the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Medicine skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• During a short rest, you can clean and bind the wounds of up to six willing beasts and humanoids. Make a DC 15 Wisdom (Medicine) check for each creature. On a success, if a creature spends a Hit Die during this rest, that creature can forgo the roll and instead regain the maximum number of hit points the die can restore. A creature can do so only once per rest, regardless of how many Hit Dice it spends.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            },
            {
               "_category": "skills",
               "__text": "Medicine+%0"
            }
         ]
      },
      {
         "name": "Medium Armor Master",
         "prerequisite": "Proficiency with medium armor",
         "text": [
            "You have practiced moving in medium armor to gain the following benefits.",
            
            "• Wearing medium armor doesn't impose disadvantage on your Dexterity (Stealth) checks.",
            
            "• When you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Menacing",
         "prerequisite": "",
         "text": [
            "You become fearsome to others, gaining the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Intimidation skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• When you take the Attack action on your turn, you can replace one attack with an attempt to demoralize one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Intimidation) check contested by the target’s Wisdom (Insight) check. If your check succeeds, the target is frightened until the end of your next turn. If your check fails, the target can’t be frightened by you in this way for 1 hour.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "proficiency": "intimidation",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Menacing (Proficient)",
         "prerequisite": "",
         "text": [
            "You become fearsome to others, gaining the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Intimidation skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• When you take the Attack action on your turn, you can replace one attack with an attempt to demoralize one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Intimidation) check contested by the target’s Wisdom (Insight) check. If your check succeeds, the target is frightened until the end of your next turn. If your check fails, the target can’t be frightened by you in this way for 1 hour.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 2"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Intimidation+%0"
            }
         ]
      },
      {
         "name": "Mobile",
         "prerequisite": "",
         "text": [
            "You are exceptionally speedy and agile. You gain the following benefits.",
            
            "• Your speed increases by 10 feet.",
            
            "• When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.",
            
            "• When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "modifier": [
            {
               "_category": "bonus",
               "__text": "speed +10"
            }
         ]
      },
      {
         "name": "Moderately Armored (Dexterity)",
         "prerequisite": "Proficiency with light armor",
         "text": [
            "You have trained to master the use of medium armor and shields, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with medium armor and shields.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Moderately Armored (Strength)",
         "prerequisite": "Proficiency with light armor",
         "text": [
            "You have trained to master the use of medium armor and shields, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with medium armor and shields.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Mounted Combatant",
         "prerequisite": "",
         "text": [
            "You are a dangerous foe to face while mounted. While you are mounted and aren't incapacitated, you gain the following benefits.",
            
            "• You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount.",
            
            "• You can force an attack targeted at your mount to target you instead.",
            
            "• If your mount is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Naturalist",
         "prerequisite": "",
         "text": [
            "Your extensive study of nature rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Nature skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the druidcraft and detect poison and disease spells. You can cast detect poison and disease once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "proficiency": "nature",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Naturalist (Proficient)",
         "prerequisite": "",
         "text": [
            "Your extensive study of nature rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Nature skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the druidcraft and detect poison and disease spells. You can cast detect poison and disease once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            },
            {
               "_category": "skills",
               "__text": "Nature+%0"
            }
         ]
      },
      {
         "name": "Observant (Intelligence)",
         "prerequisite": "",
         "text": [
            "Quick to notice details of your environment, you gain the following benefits.",
            
            "• Increase your Intelligence or Wisdom score by 1, to a maximum of 20.",
            
            "• If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.",
            
            "• You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "modifier": [
            {
               "_category": "bonus",
               "__text": "passive wisdom +5"
            },
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Observant (Wisdom)",
         "prerequisite": "",
         "text": [
            "Quick to notice details of your environment, you gain the following benefits.",
            
            "• Increase your Intelligence or Wisdom score by 1, to a maximum of 20.",
            
            "• If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.",
            
            "• You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "modifier": [
            {
               "_category": "bonus",
               "__text": "passive wisdom +5"
            },
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Orcish Aggression",
         "prerequisite": "Half-Orc",
         "text": [
            "As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 3"
         ]
      },
      {
         "name": "Orcish Fury (Constitution)",
         "prerequisite": "Half-Orc",
         "text": [
            "Your fury burns tirelessly. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, up to a maximum of 20.",
            
            "• When you hit with an attack using a simple or martial weapon, you can roll one of the weapon’s damage dice an additional time and add it as extra damage of the weapon’s damage type. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "• Immediately after you use your Relentless Endurance trait, you can use your reaction to make one weapon attack.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Orcish Fury (Strength)",
         "prerequisite": "Half-Orc",
         "text": [
            "Your fury burns tirelessly. You gain the following benefits:",
            
            "• Increase your Strength score by 1, up to a maximum of 20.",
            
            "• When you hit with an attack using a simple or martial weapon, you can roll one of the weapon’s damage dice an additional time and add it as extra damage of the weapon’s damage type. Once you use this ability, you can’t use it again until you finish a short or long rest.",
            
            "• Immediately after you use your Relentless Endurance trait, you can use your reaction to make one weapon attack.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Pereceptive",
         "prerequisite": "",
         "text": [
            "You hone your senses until they become razor sharp. You gain the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Perception skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• Being in a lightly obscured area doesn’t impose disadvantage on your Wisdom (Perception) checks if you can both see and hear.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "proficiency": "perception",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Pereceptive (Proficient)",
         "prerequisite": "",
         "text": [
            "You hone your senses until they become razor sharp. You gain the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Perception skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• Being in a lightly obscured area doesn’t impose disadvantage on your Wisdom (Perception) checks if you can both see and hear.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            },
            {
               "_category": "skills",
               "__text": "Perception+%0"
            }
         ]
      },
      {
         "name": "Performer",
         "prerequisite": "",
         "text": [
            "You master performance so that you can command any stage. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Performance skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• While performing, you can try to distract one humanoid you can see who can see and hear you. Make a Charisma (Performance) check contested by the humanoid’s Wisdom (Insight) check. If your check succeeds, you grab the humanoid’s attention enough that it makes Wisdom (Perception) and Intelligence (Investigation) checks with disadvantage until you stop performing.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "proficiency": "performance",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Performer (Proficient)",
         "prerequisite": "",
         "text": [
            "You master performance so that you can command any stage. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Performance skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• While performing, you can try to distract one humanoid you can see who can see and hear you. Make a Charisma (Performance) check contested by the humanoid’s Wisdom (Insight) check. If your check succeeds, you grab the humanoid’s attention enough that it makes Wisdom (Perception) and Intelligence (Investigation) checks with disadvantage until you stop performing.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Performance+%0"
            }
         ]
      },
      {
         "name": "Polearm Master",
         "prerequisite": "",
         "text": [
            "You can keep your enemies at bay with reach weapons. You gain the following benefits.",
            
            "• When you take the Attack action and attack with only a glaive, halberd, or quarterstaff, you can use a bonus action to make a melee attack with the opposite end of the weapon. This attack uses the same ability modifier as the primary attack. The weapon’s damage die for this attack is a d4, and it deals bludgeoning damage.",
            
            "• While you are wielding a glaive, halberd, pike, or quarterstaff, other creatures provoke an opportunity attack from you when they enter your reach.",
            
            "Source: Player's Handbook, p. 168"
         ]
      },
      {
         "name": "Prodigy",
         "prerequisite": "Half-Elf or Human",
         "text": [
            "You have a knack for learning new things. You gain the following benefits:",
            
            "• You gain one skill proficiency of your choice, one tool proficiency of your choice, and fluency in one language of your choice.",
            
            "• Choose one skill in which you have proficiency. You gain expertise in that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefitting from a feature, such as Expertise, that doubles your proficiency bonus.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ]
      },
      {
         "name": "Quick-Fingered",
         "prerequisite": "",
         "text": [
            "Your nimble fingers and agility let you perform sleight of hand. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Sleight of Hand skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• As a bonus action, you can make a Dexterity (Sleight of Hand) check to plant something on someone else, conceal an object on a creature, lift a purse, or take something from a pocket.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "proficiency": "sleight of hand",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Quick-Fingered (Proficient)",
         "prerequisite": "",
         "text": [
            "Your nimble fingers and agility let you perform sleight of hand. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Sleight of Hand skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• As a bonus action, you can make a Dexterity (Sleight of Hand) check to plant something on someone else, conceal an object on a creature, lift a purse, or take something from a pocket.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            },
            {
               "_category": "skills",
               "__text": "Sleight of Hand+%0"
            }
         ]
      },
      {
         "name": "Resilient (Charisma)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "charisma",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Resilient (Constitution)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "constitution",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Resilient (Dexterity)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "dexterity",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Resilient (Intelligence)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "intelligence",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Resilient (Strength)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "strength",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Resilient (Wisdom)",
         "prerequisite": "",
         "text": [
            "Choose one ability score. You gain the following benefits.",
            
            "• Increase the chosen ability score by 1, to a maximum of 20.",
            
            "• You gain proficiency in saving throws using the chosen ability.",
            
            "Source: Player's Handbook, p. 168"
         ],
         "proficiency": "wisdom",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Revenant Blade",
         "prerequisite": "Elf",
         "text": [
            "You are descended from a master of the double blade and their skills have passed on to you. You gain the following benefits:",
            
            "• Increase your Dexterity or Strength score by 1, to a maximum of 20.",
            
            "• While wielding a double-bladed weapon with two hands, the weapon has the finesse trait for your attacks with it, and you gain +1 AC.",
            
            "• On your turn, when you use a bonus action to make a melee attack with the blade at the opposite end of the weapon, the weapon’s damage die for this attack increases to 2d4, instead of 1d4.",
            
            "Source: Wayfinder's Guide to Eberron, Chapter 3"
         ]
      },
      {
         "name": "Ritual Caster (Bard)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level bard spells of your choice. The spells you choose must have the ritual tag. Charisma is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the bard spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Ritual Caster (Cleric)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level cleric spells of your choice. The spells you choose must have the ritual tag. Wisdom is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the cleric spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Ritual Caster (Druid)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level druid spells of your choice. The spells you choose must have the ritual tag. Wisdom is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the druid spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Ritual Caster (Sorcerer)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level sorcerer spells of your choice. The spells you choose must have the ritual tag. Charisma is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the sorcerer spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Ritual Caster (Warlock)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level warlock spells of your choice. The spells you choose must have the ritual tag. Charisma is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the warlock spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Ritual Caster (Wizard)",
         "prerequisite": "Intelligence or Wisdom 13 or higher",
         "text": [
            "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.",
            "When you choose this feat, you acquire a ritual book holding two 1st-level wizard spells of your choice. The spells you choose must have the ritual tag. Intelligence is your spellcasting ability for these spells.",
            "If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the wizard spell list, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Savage Attacker",
         "prerequisite": "",
         "text": [
            "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Second Chance (Charisma)",
         "prerequisite": "Halfling",
         "text": [
            "Fortune favors you when someone tries to strike you. You gain the following benefits:",
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            "• When a creature you can see hits you with an attack roll, you can use your reaction to force that creature to reroll. Once you use this ability, you can’t do so again until you roll initiative at the start of combat or until you finish a short or long rest.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Second Chance (Constitution)",
         "prerequisite": "Halfling",
         "text": [
            "Fortune favors you when someone tries to strike you. You gain the following benefits:",
            
            "• Increase your Constitution score by 1, to a maximum of 20.",
            
            "• When a creature you can see hits you with an attack roll, you can use your reaction to force that creature to reroll. Once you use this ability, you can’t do so again until you roll initiative at the start of combat or until you finish a short or long rest.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "constitution +1"
            }
         ]
      },
      {
         "name": "Second Chance (Dexterity)",
         "prerequisite": "Halfling",
         "text": [
            "Fortune favors you when someone tries to strike you. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• When a creature you can see hits you with an attack roll, you can use your reaction to force that creature to reroll. Once you use this ability, you can’t do so again until you roll initiative at the start of combat or until you finish a short or long rest.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Sentinel",
         "prerequisite": "",
         "text": [
            "You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits.",
            
            "• When you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn.",
            
            "• Creatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.",
            
            "• When a creature within 5 feet of you makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature.",
            
            "Source: Player's Handbook, p. 169"
         ]
      },
      {
         "name": "Sharpshooter",
         "prerequisite": "",
         "text": [
            "You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits.",
            
            "• Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.",
            
            "• Your ranged weapon attacks ignore half cover and three-quarters cover.",
            
            "• Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Shield Master",
         "prerequisite": "",
         "text": [
            "You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield.",
            
            "• If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.",
            
            "• If you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.",
            
            "• If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Silver-Tongued",
         "prerequisite": "",
         "text": [
            "You develop your conversational skill to better deceive others. You gain the following benefits:",
            
            
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            
            
            "• You gain proficiency in the Deception skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            
            
            "• When you take the Attack action on your turn, you can replace one attack with an attempt to deceive one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Deception) check contested by the target’s Wisdom (Insight) check. If your check succeeds, your movement doesn’t provoke opportunity attacks from the target and your attack rolls against it have advantage; both benefits last until the end of your next turn or until you use this ability on a different target. If your check fails, the target can’t be deceived by you in this way for 1 hour.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "proficiency": "deception",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            }
         ]
      },
      {
         "name": "Silver-Tongued (Proficient)",
         "prerequisite": "",
         "text": [
            "You develop your conversational skill to better deceive others. You gain the following benefits:",
            
            
            
            "• Increase your Charisma score by 1, to a maximum of 20.",
            
            
            
            "• You gain proficiency in the Deception skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            
            
            "• When you take the Attack action on your turn, you can replace one attack with an attempt to deceive one humanoid you can see within 30 feet of you that can see and hear you. Make a Charisma (Deception) check contested by the target’s Wisdom (Insight) check. If your check succeeds, your movement doesn’t provoke opportunity attacks from the target and your attack rolls against it have advantage; both benefits last until the end of your next turn or until you use this ability on a different target. If your check fails, the target can’t be deceived by you in this way for 1 hour.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 3"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "charisma +1"
            },
            {
               "_category": "skills",
               "__text": "Deception+%0"
            }
         ]
      },
      {
         "name": "Skilled",
         "prerequisite": "",
         "text": [
            "You gain proficiency in any combination of three skills or tools of your choice.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Skulker",
         "prerequisite": "Dexterity 13 or higher",
         "text": [
            "You are expert at slinking through shadows. You gain the following benefits.",
            
            "• You can try to hide when you are lightly obscured from the creature from which you are hiding.",
            
            "• When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position.",
            
            "• Dim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Spear Mastery",
         "prerequisite": "",
         "text": [
            "Though the spear is a simple weapon to learn, it rewards you for the time you have taken to master it. You gain the following benefits.",
            
            "• You gain a +1 bonus to attack rolls you make with a spear.",
            
            "• When you use a spear, its damage die changes from a d6 to a d8, and from a d8 to a d10 when wielded with two hands. (This benefit has no effect if another feature has already improved the weapon’s die.)",
            
            "• You can set your spear to receive a charge. As a bonus action, choose a creature you can see that is at least 20 feet away from you. If that creatures moves within your spear’s reach on its next turn, you can make a melee attack against it with your spear as a reaction. If the attack hits, the target takes an extra 1d8 piercing damage, or an extra 1d10 piercing damage if you wield the spear with two hands. You can’t use this ability if the creature used the Disengage action before moving.",
            
            "• As a bonus action on your turn, you can increase your reach with a spear by 5 feet for the rest of your turn.",
            
            "Source: Unearthed Arcana: Feats, p. 3"
         ]
      },
      {
         "name": "Spell Sniper",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "You have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits.",
            
            "• When you cast a spell that requires you to make an attack roll, the spell's range is doubled.",
            
            "• Your ranged spell attacks ignore half cover and three-quarters cover.",
            
            "• You learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Squat Nimbleness (Dexterity)",
         "prerequisite": "Dwarf or a Small race",
         "text": [
            "You are uncommonly nimble for your race. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• Increase your walking speed by 5 feet.",
            
            "• You gain proficiency in the Acrobatics or Athletics skill (your choice).",
            
            "• You have advantage on any Strength 9Athletics) or Dexterity (Acrobatics) check you makes to escape from being grappled.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            },
            {
               "_category": "bonus",
               "__text": "speed + 5"
            }
         ]
      },
      {
         "name": "Squat Nimbleness (Strength)",
         "prerequisite": "Dwarf or a Small race",
         "text": [
            "You are uncommonly nimble for your race. You gain the following benefits:",
            
            "• Increase your Strength score by 1, to a maximum of 20.",
            
            "• Increase your walking speed by 5 feet.",
            
            "• You gain proficiency in the Acrobatics or Athletics skill (your choice).",
            
            "• You have advantage on any Strength 9Athletics) or Dexterity (Acrobatics) check you makes to escape from being grappled.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            },
            {
               "_category": "bonus",
               "__text": "speed + 5"
            }
         ]
      },
      {
         "name": "Stealthy",
         "prerequisite": "",
         "text": [
            "You know how best to hide. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Stealth skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• If you are hidden, you can move up to 10 feet in the open without revealing yourself if you end the move in a position where you’re not clearly visible.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "proficiency": "stealth",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Stealthy (Proficient)",
         "prerequisite": "",
         "text": [
            "You know how best to hide. You gain the following benefits:",
            
            "• Increase your Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Stealth skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• If you are hidden, you can move up to 10 feet in the open without revealing yourself if you end the move in a position where you’re not clearly visible.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            },
            {
               "_category": "skills",
               "__text": "Stealth+%0"
            }
         ]
      },
      {
         "name": "Survivalist",
         "prerequisite": "",
         "text": [
            "You master wilderness lore, gaining the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Survival skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the alarm spell. You can cast it once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "proficiency": "survival",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            }
         ]
      },
      {
         "name": "Survivalist (Proficient)",
         "prerequisite": "",
         "text": [
            "You master wilderness lore, gaining the following benefits:",
            
            "• Increase your Wisdom score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Survival skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the alarm spell. You can cast it once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "wisdom +1"
            },
            {
               "_category": "skills",
               "__text": "Survival+%0"
            }
         ]
      },
      {
         "name": "Svirfneblin Magic",
         "prerequisite": "Gnome (deep gnome)",
         "text": [
            "You have inherited the innate spellcasting ability of your ancestors. This ability allows you to cast nondetection on yourself at will, without needing a material component. You can also cast each of the following spells once with this ability: blindness/deafness, blur, and disguise self. You regain the ability to cast these spells when you finish a long rest.",
            "Intelligence is your spellcasting ability for these spells, and you cast them at their lowest possible levels.",
            
            "Source: Sword Coast Adventurer's Guide, p. 115",
            "Elemental Evil Player's Companion, p. 7",
            "Mordenkainen's Tome of Foes, p. 114"
         ]
      },
      {
         "name": "Tavern Brawler",
         "prerequisite": "",
         "text": [
            "Accustomed to rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits.",
            
            "• Increase your Strength or Constitution score by 1, to a maximum of 20.",
            
            "• You are proficient with improvised weapons.",
            
            "• Your unarmed strike uses a d4 for damage.",
            
            "• When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Theologian",
         "prerequisite": "",
         "text": [
            "Your extensive study of religion rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Religion skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the thaumaturgy and detect evil and good spells. You can cast detect evil and good once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "proficiency": "religion",
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Theologian (Proficient)",
         "prerequisite": "",
         "text": [
            "Your extensive study of religion rewards you with the following benefits:",
            
            "• Increase your Intelligence score by 1, to a maximum of 20.",
            
            "• You gain proficiency in the Religion skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it.",
            
            "• You learn the thaumaturgy and detect evil and good spells. You can cast detect evil and good once without expending a spell slot, and you regain the ability to do so when you finish a long rest.",
            
            "Source: Unearthed Arcana: Feats for Skills, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            },
            {
               "_category": "skills",
               "__text": "Religion+%0"
            }
         ]
      },
      {
         "name": "Tough",
         "prerequisite": "",
         "text": [
            "Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "War Caster",
         "prerequisite": "The ability to cast at least one spell",
         "text": [
            "You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits.",
            
            "• You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.",
            
            "• You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.",
            
            "• When a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature.",
            
            "Source: Player's Handbook, p. 170"
         ]
      },
      {
         "name": "Weapon Master (Desterity)",
         "prerequisite": "",
         "text": [
            "You have practiced extensively with a variety of weapons, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon.",
            
            "Source: Player's Handbook, p. 170"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Weapon Master (Strength)",
         "prerequisite": "",
         "text": [
            "You have practiced extensively with a variety of weapons, gaining the following benefits.",
            
            "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
            
            "• You gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon.",
            
            "Source: Player's Handbook, p. 170"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "strength +1"
            }
         ]
      },
      {
         "name": "Wonder Maker (Dexterity)",
         "prerequisite": "Gnome (rock)",
         "text": [
            "You master the tinker techniques of your people. You gain the following benefits:",
            
            "• Increase your Dexterity or Intelligence score by 1, to a maximum of 20.",
            
            "• When you make a check using your proficiency with tinker’s tools, you add double your proficiency bonus to the check.",
            
            "• When you make a device with your Tinker trait, you have the following additional options for what you make:",
            
            "Alarm: This device senses when a creature moves to within 15 feet of it without speaking aloud a password chosen when you create it. One round after a creature moves into range, the alarm makes a shrill ringing that lasts for 1 minute and can be heard from up to 300 feet away.",
            
            "Calculator: This device makes doing sums easy.",
            
            "Lifter: This device can be used as a block and tackle, allowing its user to hoist five times the weight the user can normally lift.",
            
            "Timekeeper: This pocket watch keeps accurate time.",
            
            "Weather Sensor: When used as an action, this device predicts weather conditions in a 1-mile radius over the next 4 hours, showing one symbol (clouds, sun/moon, rain, or snow) for each hour.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "dexterity +1"
            }
         ]
      },
      {
         "name": "Wonder Maker (Intelligence)",
         "prerequisite": "Gnome (rock)",
         "text": [
            "You master the tinker techniques of your people. You gain the following benefits:",
            
            "• Increase your Dexterity or Intelligence score by 1, to a maximum of 20.",
            
            "• When you make a check using your proficiency with tinker’s tools, you add double your proficiency bonus to the check.",
            
            "• When you make a device with your Tinker trait, you have the following additional options for what you make:",
            
            "Alarm: This device senses when a creature moves to within 15 feet of it without speaking aloud a password chosen when you create it. One round after a creature moves into range, the alarm makes a shrill ringing that lasts for 1 minute and can be heard from up to 300 feet away.",
            
            "Calculator: This device makes doing sums easy.",
            
            "Lifter: This device can be used as a block and tackle, allowing its user to hoist five times the weight the user can normally lift.",
            
            "Timekeeper: This pocket watch keeps accurate time.",
            
            "Weather Sensor: When used as an action, this device predicts weather conditions in a 1-mile radius over the next 4 hours, showing one symbol (clouds, sun/moon, rain, or snow) for each hour.",
            
            "Source: Unearthed Arcana: Feats for Races, p. 4"
         ],
         "modifier": [
            {
               "_category": "ability score",
               "__text": "intelligence +1"
            }
         ]
      },
      {
         "name": "Wood Elf Magic",
         "prerequisite": "Elf (wood)",
         "text": [
            "You learn the magic of the primeval woods, which are revered and protected by your people. You learn one druid cantrip of your choice. You also learn the longstrider and pass without trace spells, each of which you can cast once without expending a spell slot. You regain the ability to cast these two spells in this way when you finish a long rest. Wisdom is your spellcasting ability for all three spells.",
            
            "Source: Xanathar's Guide to Everything, p. 75"
         ]
      }
   ]

module.exports = DndFeats;