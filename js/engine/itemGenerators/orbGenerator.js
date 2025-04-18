import { generateRandomNumberWithMaxRange } from "../../utils/utils.js";
import translateMap from '../../rules/translateMap.js';

export default {
    generateItem: function () {
        const roll = generateRandomNumberWithMaxRange(100);

        const orbDrops = [
            { range: [1, 20], rarity: 'common', orb: 'black_orb' },       // 20% de chance para 'black_orb'
            { range: [21, 40], rarity: 'rare', orb: 'green_orb' },        // 20% de chance para 'green_orb'
            { range: [41, 60], rarity: 'rare', orb: 'blue_orb' },         // 20% de chance para 'blue_orb'
            { range: [61, 75], rarity: 'rare', orb: 'red_orb' },          // 15% de chance para 'red_orb'
            { range: [76, 90], rarity: 'epic', orb: 'special_orb' },      // 15% de chance para 'special_orb'
            { range: [91, 100], rarity: 'legendary', orb: 'summon_orb' }, // 10% de chance para 'summon_orb'
        ];

        const drop = orbDrops.find(d => roll >= d.range[0] && roll <= d.range[1]);
        
        return {
            type: "orb",
            rarity: drop.rarity,
            model: this.translateOrb(drop.orb),
            options: []
        };
    },

    translateOrb: function (key) {
        return translateMap.orb[key] || "Desconhecido";
    },
};
