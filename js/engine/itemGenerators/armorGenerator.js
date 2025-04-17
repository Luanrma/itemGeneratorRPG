import armorRules from '../../rules/armorRules.js';
import itemsInfo from '../../rules/itemsInfo.js'
import { armorAndWeaponsStatusGeneratorByLevel as armorGenerator } from '../leveling.js';

export default {
    generateItem: function (playerLevel) {
        const rarity = this.getRandomRarity();
        const optsCount = itemsInfo.rarity_table[rarity];
        const selectedOpts = [];
        const itemType = this.getRandomArmorPart();

        for (let i = 1; i <= optsCount; i++) {
            const optKey = `opt_${i}`;
            
            if (typeof armorRules[optKey] !== "function") {
                continue;
            }
          
            const availableOpts = this.getRandomOptAndRemove(optKey, selectedOpts);
          
            if (availableOpts.length === 0) {
                continue;
            }
            
            const randomOpt = this.getRandomOption(availableOpts);
            const statusItem = ` + ${armorGenerator(playerLevel)}`;
            const diceBonus = randomOpt.includes("plus_dice") ? ` + ${this.rollDice()}` : "";
            
            selectedOpts.push({description: randomOpt, status: statusItem, diceBonus: diceBonus });
        }

        return {
            type: "armor",
            rarity,
            itemType,
            options: selectedOpts
        };
    },

    getRandomRarity: function () {
        const roll = Math.floor(Math.random() * 100) + 1;

        if (roll >= 1 && roll <= 35) return "common";
        if (roll >= 36 && roll <= 60) return "uncommon";
        if (roll >= 61 && roll <= 80) return "rare";
        if (roll >= 81 && roll <= 93) return "epic";
        if (roll >= 94 && roll <= 100) return "legendary";
    },

    getRandomOption: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomArmorPart: function () {
        const randomValue = Math.floor(Math.random() * 5) + 1; 
        return Object.keys(itemsInfo.armor_parts).find(key => itemsInfo.armor_parts[key] === randomValue);
    },

    getRandomOptAndRemove: function (optKey, selectedOpts) {
        return armorRules[optKey]().filter(opt => !selectedOpts.some(sel => sel.description === opt));
    },

    rollDice: function () {
        const diceOptions = ["D4", "D6", "D10", "D12"];
        return diceOptions[Math.floor(Math.random() * diceOptions.length)];
    }
};