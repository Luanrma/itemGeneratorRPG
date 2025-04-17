import { generateRandomNumberWithMaxRange } from "../../utils/utils.js"
import { armorAndWeaponsStatusGeneratorByLevel as levelBonus } from "../leveling.js";
import translateMap from '../../rules/translateMap.js';

export default {
    generateItem: function (playerLevel) {
        const roll = generateRandomNumberWithMaxRange(100);

        const drops = [
            { range: [1, 20],   rarity: "commom", type: "potion",   name: "hp_potion",      value: ` + ${5 + levelBonus(playerLevel)}` },
            { range: [21, 40],  rarity: "commom", type: "potion",   name: "mp_potion",      value: ` + ${5 + levelBonus(playerLevel)}` },
            { range: [41, 55],  rarity: "commom", type: "potion",   name: "lunchbox",       value: ` + ${10 + levelBonus(playerLevel)}` },
            { range: [56, 64],  rarity: "rare",   type: "potion",   name: "heal_potion",    value: "" },
            { range: [65, 73],  rarity: "rare",   type: "potion",   name: "full_mp_potion", value: "" },
            { range: [74, 82],  rarity: "rare",   type: "potion",   name: "full_hp_potion", value: "" },
            { range: [83, 100], rarity: "epic",   type: "potion",   name: "special_potion", value: "" },
        ];

        const drop = drops.find(d => roll >= d.range[0] && roll <= d.range[1]);


        return {
            type: "potion",
            rarity: drop.rarity,
            model: this.translatePotion(drop.name),
            options: [{description: drop.name, status: drop.value, diceBonus: "" }]
        };
    },

    translatePotion: function (key) {
        return translateMap.potion[key] || "Desconhecido";
    },
};
