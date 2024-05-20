const { loadCategoriesHTML, loadMenusHTML, loadReviewsHTML } = require('./uiHandlers');
const { handlePostReview } = require('./PostReview');
const { handleFavorite } = require('./handleFavorite');
const indexedDb = require('../../utils/indexedDb');

async function fetchRestaurantDetails(id) {
  const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${id}`);
  return response.json();
}

function createErrorElement(message) {
  const errorElement = document.createElement('div');
  errorElement.textContent = message;
  errorElement.style.color = 'red';
  return errorElement;
}

async function loadRestaurantHTML(restaurant) {
  const isFavorite = await indexedDb('getid', restaurant);
  const categoryList = await loadCategoriesHTML(restaurant.categories);
  const menusList = await loadMenusHTML(restaurant.menus);
  const reviewList = await loadReviewsHTML(restaurant.customerReviews);

  return `
    <section class="hero">
      <div class="content-details">
        <div>
          <h3 class="rating">⭐ ${restaurant.rating}</h3>
        </div>
        <h1 class="name">${restaurant.name}</h1>
        <div class="category">
        ${categoryList}
        </div>
        <button id="btn-favorite" class="${isFavorite !== undefined ? 'btn-favorited' : 'btn-notfavorite'}">${isFavorite !== undefined ? 'Remove From Favorite -' : 'Add To Favorite +'}  </button>
        <p class="addres">${restaurant.city} ${restaurant.address}</p>
      </div>
      <img loading="lazy" crossorigin="anonymous" src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" class="img-details" alt="Hero Image" width="100%">
    </section>
    <section class="description">
      <p>${restaurant.description}</p>
    </section>
    <section class="Menu">
      ${menusList}
    </section>
    <h1 class="title-detail-restaurant">Customer Reviews</h1>
    <section class="review">
      <div class="review-user">
          ${reviewList}
      </div>
      <form  class="container-form">
          <h1 class="title-form">Berikan Riviewmu</h1>
          <input required type="text" name="name" id="name" placeholder="Name">
          <input required type="text" name="review" id="review" placeholder="Berikan Reviewmu">
          <button  class="btn-submit" type="submit">Submit</button>
      </form>
    </section>
  `;
}

async function loadAndDisplayDetailsRestaurants() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  try {
    const data = await fetchRestaurantDetails(id);
    const restaurantDetails = document.getElementById('restaurant-details');
    const restaurantItem = document.createElement('div');
    restaurantItem.innerHTML = await loadRestaurantHTML(data.restaurant);
    if (restaurantDetails) {
      restaurantDetails.appendChild(restaurantItem);
    }
    handlePostReview(data.restaurant.id);
    handleFavorite(data.restaurant);
  } catch (error) {
    document.body.appendChild(createErrorElement('Gagal memuat detail restoran. Silakan coba lagi.'));
  }
}

module.exports = {
  loadAndDisplayDetailsRestaurants,
  loadRestaurantHTML,
  fetchRestaurantDetails,
  createErrorElement,
};
