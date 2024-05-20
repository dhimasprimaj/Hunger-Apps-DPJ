require('regenerator-runtime');
require('../styles/main.css');
const loadAndDisplayRestaurants = require('./daftar');
const loadNavbar = require('../components/navbar');
const { loadFooter } = require('../components/footer');

document.addEventListener('DOMContentLoaded', async () => {
  // Panggil fungsi untuk memuat dan menampilkan daftar restoran
  loadAndDisplayRestaurants();
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
