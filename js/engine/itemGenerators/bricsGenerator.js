import { armorAndWeaponsStatusGeneratorByLevel } from '../leveling.js';

export default {
    generateItem: function (playerLevel) {       
        return {
            type: "brics",
            rarity: "common",
            model: (armorAndWeaponsStatusGeneratorByLevel(playerLevel) * 2),
            options: []
        };
    },
};
