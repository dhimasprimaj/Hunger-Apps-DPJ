const indexedDb = require('../../utils/indexedDb');

function handleFavorite() {
  const btnFavorite = document.body;
  btnFavorite.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-favorited')) {
      e.target.classList.toggle('btn-favorited');
      e.target.classList.toggle('btn-notfavorite');
      window.location.reload();
      await indexedDb('delete', e.target.id);
    }
  });
}

async function loadAndDisplayRestaurantsFavorite() {
  try {
    let restauranstCard = '';
    const restaurantList = document.querySelector('#favorite');
    const favoriteData = await indexedDb('get', '');
    const title = document.querySelector('#list');
    if (favoriteData.length === 0) {
      title.innerHTML = '<h1 class="data-empty">kosong, simpan Restaurant terlebih dahulu</h1>';
    }
    favoriteData.forEach(async (restaurant) => {
      handleFavorite();
      const {
        name,
        pictureId,
        city,
        rating,
        description,
        id,
      } = restaurant;
      restauranstCard += `
                <div class="card">
                <div class="card-content" tabindex="0">
                <img loading="lazy" crossorigin="anonymous" class="card-img" src="https://restaurant-api.dicoding.dev/images/medium/${pictureId}" alt="${name}">
                  <p class="card-rating">Rating: ${rating}</p>
                    <h3 class="card-title">${name}</h3>
                    <p class="card-subtitle">${city}</p>
                    <p class="card-description">${description}...
                    </p>
                    <a id="details-btn" href="/details-restaurant.html?id=${id}">More Details</a>
                    <div class="action">
                    <button id=${id} class="btn-favorited custom-font">Remove From Favorite -</button>
                    </div>
                  </div>
                </div>
                `;
      restaurantList.innerHTML = restauranstCard;
    });
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.textContent = 'Gagal memuat data restoran. Silakan coba lagi.';
    errorElement.style.color = 'red';
    document.body.appendChild(errorElement);
  }
}

module.exports = loadAndDisplayRestaurantsFavorite;
