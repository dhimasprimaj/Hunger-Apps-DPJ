function loadCategoriesHTML(categories) {
  return categories.map((category) => `<p class="badge">${category.name}</p>`).join('');
}

function loadMenusHTML(menus) {
  const { foods, drinks } = menus;
  return `
      <h1 class="title-detail-restaurant">Menu</h1>
      <div class="menu-list">
        <div class="container-menu" tabindex="0">
          <div class="cover-menu">
            <h1 class="title-menu">Makanan</h1>
            <img loading="lazy" src="./images/details-restaurant/food.webp" class="Menu-img" alt="food-image" width="100%">
          </div>
          <h1 class="title-menu-inside">Menu Makanan kami</h1>
          <div class="content-menu">
            ${foods.map((food) => `<li>${food.name}</li>`).join('')}
          </div>
        </div>
        <div class="container-menu" tabindex="0">
          <div class="cover-menu">
            <h1 class="title-menu">Minuman</h1>
            <img loading="lazy" src="./images/details-restaurant/drinks.webp" class="Menu-img" alt="drink-image" width="100%">
          </div>
          <h1 class="title-menu-inside">Menu Minuman kami</h1>
          <div class="content-menu">
            ${drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
          </div>
        </div>
      </div>
    `;
}

function loadReviewsHTML(reviews) {
  return reviews.reverse().map((review) => `
      <figure class="card-review">
        <blockquote>
          <p class="review-text">${review.review}</p>
        </blockquote>
        <h3 class="nama-reviewer">${review.name}</h3>
        <h4 class="tanggal-direview">${review.date}</h4>
      </figure>
    `).join('');
}

module.exports = {
  loadCategoriesHTML,
  loadMenusHTML,
  loadReviewsHTML,
};
