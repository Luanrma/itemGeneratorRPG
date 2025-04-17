import { generateRandomNumberWithMaxRange } from "../../utils/utils.js";

export default {
    dropItem: function () {
        const roll = generateRandomNumberWithMaxRange(100);

        const itemDrops = [
            { range: [1, 18],   type: 'brics' },
            { range: [19, 37],  type: 'potion' },
            { range: [38, 55],  type: 'armor' },
            { range: [56, 73],  type: 'weapon' },
            { range: [74, 88],  type: 'orb' },
            { range: [89, 100], type: 'special_item' },
        ];

        const drop = itemDrops.find(d => roll >= d.range[0] && roll <= d.range[1]);

        return {
            type: drop.type
        };
    }
};