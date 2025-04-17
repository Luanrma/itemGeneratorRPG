import weaponsRules from '../rules/weaponRules.js';
import itemsInfo from '../rules/itemsInfo.js';
import leveling from './leveling.js';
import translateMap from '../rules/translateMap.js';

export default {
    generateItem: function (playerLevel) {
        const rarity = this.getRandomRarity();
        const optsCount = itemsInfo.rarity_table[rarity];
        const selectedOpts = [];
        const itemType = this.translateWeapon(this.getRandomWeaponType());

        for (let i = 1; i <= optsCount; i++) {
            const optKey = `opt_${i}`;

            if (typeof weaponsRules[optKey] !== "function") {
                continue;
            }

            const availableOpts = weaponsRules[optKey]().filter(opt => !selectedOpts.some(sel => sel.description === opt));

            if (availableOpts.length === 0) {
                continue;
            }

            const randomOpt = this.getRandomOption(availableOpts);
            const statusItem = ` + ${leveling.itemStatus(playerLevel)}`;
            const diceBonus = randomOpt.includes("plus_dice") ? ` + ${this.rollDice()}` : "";

            selectedOpts.push({ description: randomOpt, status: statusItem, diceBonus: diceBonus });
        }

        return {
            type: "weapon",
            itemType,
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

    getRandomOption: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomWeaponType: function () {
        const randomValue = Math.floor(Math.random() * 16) + 1;
        return Object.keys(itemsInfo.weapon_types).find(k => itemsInfo.weapon_types[k] === randomValue);
    },

    rollDice: function () {
        const diceOptions = ["D4", "D6", "D10", "D12"];
        return diceOptions[Math.floor(Math.random() * diceOptions.length)];
    },

    translateWeapon: function (key) {
        return translateMap.weaponTranslations[key] || "Desconhecido";
    },
};