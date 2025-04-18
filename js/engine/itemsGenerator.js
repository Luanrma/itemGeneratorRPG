import armorGenerator from "./itemGenerators/armorGenerator.js"
import orbGenerator from "./itemGenerators/orbGenerator.js";
import weaponGenerator from "./itemGenerators/weaponGenerator.js";
import potionGenerator from "./itemGenerators/potionGenerator.js";
import specialItemGenerator from "./itemGenerators/specialItemGenerator.js";
import bricsGenerator from "./itemGenerators/bricsGenerator.js";

export default {
	generateItem: function (type, playerLevel) {
		const generators = {
			armor: () => armorGenerator.generateItem(playerLevel),
			weapon: () => weaponGenerator.generateItem(playerLevel),
			orb: () => orbGenerator.generateItem(),
			potion: () => potionGenerator.generateItem(playerLevel),
			special_item: () => specialItemGenerator.generateItem(),
			brics: () => bricsGenerator.generateItem(playerLevel),
		};

		return generators[type]?.() || alert(`Error! Item type: ${type} unknow`);
	}
};