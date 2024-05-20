const indexedDb = require('../../utils/indexedDb');

function handleFavorite(data) {
  if (data === undefined) throw new Error('data tidak boleh kosong');
  const btnFavorite = document.getElementById('btn-favorite');
  btnFavorite.addEventListener('click', async () => {
    if (btnFavorite.className === 'btn-favorited') {
      btnFavorite.classList.toggle('btn-favorited');
      btnFavorite.classList.toggle('btn-notfavorite');
      btnFavorite.textContent = 'Add To Favorite +';
      await indexedDb('delete', data.id);
    } else {
      btnFavorite.classList.toggle('btn-favorited');
      btnFavorite.classList.toggle('btn-notfavorite');
      btnFavorite.textContent = 'Remove From Favorite -';
      await indexedDb('post', data);
    }
  });
}

module.exports = {
  handleFavorite,
};
