import weaponsRules from '../rules/weaponRules.js';
import armorRules from '../rules/armorRules.js';
import itemsInfo from '../rules/itemsInfo.js';
import leveling from './leveling.js';

export default {
    generateItem: function (type, playerLevel) {
        const rules = type === "weapon" ? weaponsRules : armorRules;
        const rarity = this.getRandomRarity();
        const optsCount = itemsInfo.rarity_table[rarity];
        const selectedOpts = [];

        for (let i = 1; i <= optsCount; i++) {
            const optKey = `opt_${i}`;
            
            if (typeof rules[optKey] !== "function") {
              continue;
            }
          
            const availableOpts = rules[optKey]().filter(opt =>  
              !selectedOpts.some(sel => sel.description === opt)
            );
          
            if (availableOpts.length === 0) {
              continue;
            }
          
            const randomOpt = this.getRandomElement(availableOpts);
            const statusItem = ` + ${leveling.itemStatus(playerLevel)}`;
            const diceBonus = randomOpt.includes("plus_dice") ? ` + ${this.rollDice()}` : "";
          
            selectedOpts.push({ description: randomOpt, status: statusItem, diceBonus: diceBonus });
          }

        return {
            type,
            rarity,
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

    getRandomElement: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    rollDice: function () {
        const diceOptions = ["D4", "D6", "D10", "D12"];
        return diceOptions[Math.floor(Math.random() * diceOptions.length)];
    }
};
