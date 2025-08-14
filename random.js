// === Config ===
const MINUTES = 1;
const STORAGE_KEY = 'randomCard';
const CONTAINER_ID = 'randomCardContainer';

// === Get & show card ===
function getRandomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}

function renderCard(card) {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) {
    console.error(`Container with ID "${CONTAINER_ID}" not found.`);
    return;
  }

  container.innerHTML = `
    <div class="card">
      <img src="${card.image}" alt="${card.name}">
      <h3>#${card.id} ${card.name}</h3>
      <p>${card.gen}</p>
    </div>
  `;
}

// === Fetch + check if we can reuse cached ===
fetch('cards.json')
  .then(res => res.json())
  .then(cards => {
    const rand = cards[Math.floor(Math.random() * cards.length)];
    const container = document.getElementById('randomCardContainer');

    if (!rand || !rand.image || !rand.name) {
      container.innerHTML = "<p>Failed to load card properly.</p>";
      return;
    }

    container.innerHTML = `
      <div class="card">
        <img src="${rand.image}" alt="${rand.name}">
        <h3>#${rand.id} ${rand.name}</h3>
        <p>${rand.gen}</p>
      </div>
    `;
  })
  .catch(err => {
    console.error("Failed to load or render random card:", err);
    document.getElementById('randomCardContainer').innerHTML =
      "<p>Error loading card data.</p>";
  });

