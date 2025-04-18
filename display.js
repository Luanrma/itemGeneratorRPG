import executeItemGenerator from './js/engine/itemsGenerator.js';
import translationMap from './js/rules/translateMap.js';
import armorGenerator from './js/engine/itemGenerators/armorGenerator.js';
import weaponGenerator from './js/engine/itemGenerators/weaponGenerator.js';
import orbGenerator from './js/engine/itemGenerators/orbGenerator.js';
import dropSystem from './js/rules/dropSystem/dropSystem.js';
import potionGenerator from './js/engine/itemGenerators/potionGenerator.js';
import bricsGenerator from './js/engine/itemGenerators/bricsGenerator.js';
import specialItemGenerator from './js/engine/itemGenerators/specialItemGenerator.js';

const itens_dropped = document.getElementById('itens_dropped');
const itemCountInput = document.getElementById('itemCount');
const playerLevel = document.getElementById('playerLevel');

const weaponButton = document.getElementById('generateWeapon');
const armorButton = document.getElementById('generateArmor');
const orbButton = document.getElementById('generateOrb');
const potionButton = document.getElementById('generatePotion');
const bricsButton = document.getElementById('generateBrics');
const specialItemButton = document.getElementById('generateSpecialItem');
const generateItemsButton = document.getElementById('generateRandomItems');
const resetItems = document.getElementById('resetItems');

weaponButton.addEventListener('click', () => displayItem(weaponGenerator.generateItem(playerLevel.value)));
armorButton.addEventListener('click', () => displayItem(armorGenerator.generateItem(playerLevel.value)));
orbButton.addEventListener('click', () => displayItem(orbGenerator.generateItem()));
potionButton.addEventListener('click', () => displayItem(potionGenerator.generateItem(playerLevel.value)));
bricsButton.addEventListener('click', () => displayItem(bricsGenerator.generateItem(playerLevel.value)));
specialItemButton.addEventListener('click', () => displayItem(specialItemGenerator.generateItem()));
resetItems.addEventListener('click', () => itens_dropped.innerHTML = '');

const toggleDropdownButton = document.getElementById("toggleDropdown");
const dropdownMenu = document.getElementById("dropdownMenu");

toggleDropdownButton.addEventListener("click", () => {
	dropdownMenu.classList.toggle("show");
});

generateItemsButton.addEventListener('click', () => {
	const itemCount = parseInt(itemCountInput.value);

	if (itemCount < 1 || itemCount > 10) {
		alert("Por favor, escolha um número entre 1 e 10.");
		return;
	}

	itens_dropped.innerHTML = '';

	for (let i = 0; i < itemCount; i++) {
		const { type } = dropSystem.dropItem();
		const item = executeItemGenerator.generateItem(type, playerLevel.value);
		displayItem(item);
	}
});

function displayItem(item) {
	console.log(item)
	const card = document.createElement('div');
	card.className = `item-card rarity-${item.rarity}`;
	const rarityClass = item.rarity.toLowerCase();

	const translationMapSelected = translationMap[item.type]

	card.innerHTML = `
    <h3 class="${rarityClass}">${item.type.toUpperCase()} (${item.rarity})</h3>
    <h5 class="item-type">${item.model || ''}</h5>
    <hr>
    <ul>
      ${item.options.map(opt => {
		let translatedOpt = translationMapSelected[opt.description] || opt.description;
		translatedOpt = translatedOpt.replace(" + Dado", "");
		return `<li>${translatedOpt}${opt.status}${opt.diceBonus}</li>`;
	}).join('')}
    </ul>
  `;

	itens_dropped.appendChild(card);
}
