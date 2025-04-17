import executeItemGenerator from './js/engine/itemsGenerator.js';
import translationMap from './js/rules/translateMap.js';
import armorGenerator from './js/engine/armorGenerator.js';
import weaponGenerator from './js/engine/weaponGenerator.js';

const itens_dropped = document.getElementById('itens_dropped');
const weaponButton = document.getElementById('generateWeapon');
const armorButton = document.getElementById('generateArmor');
const generateItemsButton = document.getElementById('generateRandomItems');
const itemCountInput = document.getElementById('itemCount');
const playerLevel = document.getElementById('playerLevel');

weaponButton.addEventListener('click', () => {
    const item = weaponGenerator.generateItem(playerLevel.value);
    displayItem(item);
});

armorButton.addEventListener('click', () => {
    const item = armorGenerator.generateItem(playerLevel.value);
    displayItem(item);
});

generateItemsButton.addEventListener('click', () => {
  const itemCount = parseInt(itemCountInput.value);
  
  if (itemCount < 1 || itemCount > 3) {
    alert("Por favor, escolha um número entre 1 e 3.");
    return;
  }

  itens_dropped.innerHTML = '';

  for (let i = 0; i < itemCount; i++) {
    const type = Math.random() < 0.5 ? 'weapon' : 'armor';
    const item = executeItemGenerator.generateItem(type, playerLevel.value);
    displayItem(item);
  }
});

function displayItem(item) {
    const card = document.createElement('div');
    card.className = `item-card rarity-${item.rarity}`;
    const rarityClass = item.rarity.toLowerCase();

    const translationMapSelected = item.type === "weapon"
        ? translationMap.weapon
        : translationMap.armor;

    card.innerHTML = `
    <h3 class="${rarityClass}">${item.type.toUpperCase()} (${item.rarity})</h3>
    <h5 class="item-type">${item.itemType || ''}</h5>
    <hr>
    <ul>
      ${item.options.map(opt => {
        let translatedOpt = translationMapSelected[opt.description] || opt;
        translatedOpt = translatedOpt.replace(" + Dado", "");
        return `<li>${translatedOpt}${opt.status}${opt.diceBonus}</li>`;
      }).join('')}
    </ul>
  `;

    itens_dropped.appendChild(card);
}
