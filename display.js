import executeItemGenerator from './js/engine/itemsGenerator.js';
import translationMap from './js/rules/translateMap.js';

const itens_dropped = document.getElementById('itens_dropped');
const weaponButton = document.getElementById('generateWeapon');
const armorButton = document.getElementById('generateArmor');
const generateItemsButton = document.getElementById('generateItems');
const itemCountInput = document.getElementById('itemCount');


weaponButton.addEventListener('click', () => {
    const item = executeItemGenerator.generateItem("weapon");
    displayItem(item);
});

armorButton.addEventListener('click', () => {
    const item = executeItemGenerator.generateItem("armor");
    displayItem(item);
});

generateItemsButton.addEventListener('click', () => {
  const itemCount = parseInt(itemCountInput.value);
  
  if (itemCount < 1 || itemCount > 6) {
    alert("Por favor, escolha um número entre 1 e 6.");
    return;
  }

  // Limpar os itens anteriores
  itens_dropped.innerHTML = '';

  // Gerar o número de itens escolhido pelo usuário
  for (let i = 0; i < itemCount; i++) {
    const type = Math.random() < 0.5 ? 'weapon' : 'armor';
    const item = executeItemGenerator.generateItem(type);
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



