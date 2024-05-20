/* eslint-disable no-undef */

const { handleFavorite } = require('../src/scripts/detailsRestaurant/handleFavorite');
const indexedDb = require('../src/utils/indexedDb');

const indexedDbMock = jasmine.createSpyObj('indexedDb', ['post', 'delete']);

indexedDb.post = indexedDbMock.post;
indexedDb.delete = indexedDbMock.delete;

describe('handleFavorite', () => {
  let btnFavorite;
  let data;

  beforeEach(() => {
    btnFavorite = document.createElement('button');
    btnFavorite.id = 'btn-favorite';
    document.body.appendChild(btnFavorite);
    spyOn(document, 'getElementById').and.returnValue(btnFavorite);

    data = { id: 1, name: 'Restaurant A' };
    indexedDbMock.post.calls.reset();
    indexedDbMock.delete.calls.reset();
  });

  afterEach(() => {
    document.body.removeChild(btnFavorite);
  });

  describe('Menyukai Restaurant', () => {
    it('harus menampilkan widget untuk menyukai restaurant jika belum disukai', async () => {
      btnFavorite.className = 'btn-notfavorite';
      btnFavorite.textContent = 'Add to Favorite';
      btnFavorite.click();
      await handleFavorite(data);
      expect(btnFavorite.textContent).toBe('Add to Favorite');
      expect(btnFavorite.classList.contains('btn-notfavorite')).toBeTrue();
    });

    it('tidak menyimpan kembali jika restaurant sudah disukai', () => {
      btnFavorite.className = 'btn-favorited';
      handleFavorite(data);
      btnFavorite.click();
      expect(indexedDbMock.post).not.toHaveBeenCalledWith(data);
    });

    it('tidak memproses penyimpanan jika data restaurant tidak memiliki ID', () => {
      data = { name: 'Restaurant B' };
      handleFavorite(data);
      btnFavorite.click();
      expect(indexedDbMock.post).not.toHaveBeenCalled();
    });
  });

  describe('Batal Menyukai Restaurant', () => {
    it('harus menampilkan widget untuk batal menyukai jika restaurant sudah disukai', async () => {
      btnFavorite.className = 'btn-favorited';
      btnFavorite.textContent = 'Remove From Favorite';
      btnFavorite.click();
      await handleFavorite(data);
      expect(btnFavorite.textContent).toBe('Remove From Favorite');
      expect(btnFavorite.classList.contains('btn-favorited')).toBeTrue();
    });

    it('tidak melakukan apa-apa jika restaurant tidak ada dalam daftar yang disukai', async () => {
      btnFavorite.className = 'btn-notfavorite';
      await handleFavorite(data);
      btnFavorite.click();
      expect(indexedDbMock.delete).not.toHaveBeenCalledWith(data.id);
    });
  });
});
