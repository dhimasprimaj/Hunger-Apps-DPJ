/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

const { JSDOM } = require('jsdom');
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');
const { autoReview } = require('../src/scripts/detailsRestaurant/PostReview');

describe('autoReview', () => {
  let reviewUser; let nameInput; let
    reviewInput;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.window = dom.window;
    global.document = window.document;
    global.indexedDB = new FDBFactory();

    document.body.innerHTML = `
        <div class="review-user"></div>
        <input id="name" />
        <input id="review" />
      `;

    reviewUser = document.querySelector('.review-user');
    nameInput = document.querySelector('#name');
    reviewInput = document.querySelector('#review');
  });

  it('harus memasukkan ulasan baru paling atas daftar ulasan', () => {
    nameInput.value = 'John Doe';
    reviewInput.value = 'Sangat bagus!';

    reviewUser = document.querySelector('.review-user');
    const uiReview = document.createElement('div');
    uiReview.innerHTML = ` <figure class="card-review">
    <blockquote>
      <p>${nameInput}</p>
    </blockquote>
    <h3>${reviewInput}</h3>
    <h4>baru saja</h4>
  </figure>`;

    reviewUser.insertBefore(uiReview.firstElementChild, reviewUser.firstChild);
    autoReview(nameInput, reviewInput);
    const firstReview = reviewUser.firstChild;
    expect(firstReview.textContent.length).toBe(60);
  });

  it('tidak boleh menambahkan review jika yang diinput kosong', () => {
    nameInput.value = '';
    reviewInput.value = '';

    autoReview(nameInput, reviewInput);

    expect(reviewUser.children.length).toBe(0);
  });
});
