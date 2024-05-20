/* eslint-disable no-undef */
const { JSDOM } = require('jsdom');
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');
const loadAndDisplayRestaurants = require('../src/scripts/daftar');

const fetchs = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

describe('loadAndDisplayRestaurants', () => {
  let originalFetch;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    window.indexedDB = new FDBFactory();
    global.document = window.document;
    originalFetch = window.fetchs;
    global.window.fetch = fetchs;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('menampilkan pesan error ketika fetch gagal', () => {
    const fetchedErrorElement = document.getElementById('error-element');
    if (fetchedErrorElement) {
      expect(fetchedErrorElement.textContent).toBe('Gagal memuat data restoran. Silakan coba lagi.');
      expect(fetchedErrorElement.style.color).toBe('red');
    }
    loadAndDisplayRestaurants();
  });
});
