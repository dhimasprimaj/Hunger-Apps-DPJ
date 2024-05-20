async function loadAndDisplayRestaurants() {
  try {
    let restauranstCard = '';
    const res = await fetch('https://restaurant-api.dicoding.dev/list');
    const restaurantList = document.querySelector('#restaurant-list');
    const data = await res.json();
    const title = document.querySelector('#list');
    if (data.length === 0) {
      title.innerHTML = '<h1 class="data-empty">loading...</h1>';
    }
    data.restaurants.forEach((restaurant) => {
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
                <div class="card-content" tabindex="-1">
                <img crossorigin="anonymous" class="card-img" src="https://restaurant-api.dicoding.dev/images/medium/${pictureId}" loading="lazy"  alt="${name}">
                  <p class="card-rating">Rating: ${rating}</p>
                    <h3 class="card-title">${name}</h3>
                    <p class="card-subtitle">${city}</p>
                    <p class="card-description">${description}...
                    </p>
                    <a id="details-btn" href="/details-restaurant.html?id=${id}">More Details</a>
                    </div>
                </div>
                `;
      restaurantList.innerHTML = restauranstCard;
    });
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.id = 'error-element';
    errorElement.textContent = 'Gagal memuat data restoran. Silakan coba lagi.';
    errorElement.style.color = 'red';
    document.body.appendChild(errorElement);
    throw error;
  }
}

module.exports = loadAndDisplayRestaurants;
