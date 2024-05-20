require('regenerator-runtime');
require('../../styles/main.css');
const loadAndDisplayDetailsRestaurantsFavorite = require('./favorite');
const loadNavbar = require('../../components/navbar');
const { loadFooter } = require('../../components/footer');

document.addEventListener('DOMContentLoaded', () => {
  // Panggil fungsi untuk memuat dan menampilkan daftar restoran
  loadAndDisplayDetailsRestaurantsFavorite();
  loadNavbar();
  loadFooter();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => {

        })
        .catch(() => {

        });
    });
  }
});
