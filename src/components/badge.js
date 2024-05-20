function LoadBadge(categories) {
  let categoriesList = '';
  categories.forEach((category) => {
    categoriesList += `
        <p class='badge'>
            ${category.name}
        </p>`;
  });
  return categoriesList;
}

module.exports = LoadBadge;
