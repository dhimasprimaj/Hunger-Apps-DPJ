/* eslint-disable no-undef */
global.fecch = require('node-fetch');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
const { fetchRestaurantDetails, createErrorElement } = require('../src/scripts/detailsRestaurant/details');

describe('fetchRestaurantDetails', () => {
  beforeEach(() => {
    global.fetch = jasmine.createSpy('fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ restaurant: { id: '1', name: 'Test Restaurant' } }),
    }));
  });

  it('harus fecth ambil data menggunakan id', async () => {
    const id = '1';
    const result = await fetchRestaurantDetails(id);

    expect(global.fetch).toHaveBeenCalledWith(`https://restaurant-api.dicoding.dev/detail/${id}`);
    expect(result.restaurant.name).toEqual('Test Restaurant');
  });

  it('harus mengandle error', async () => {
    global.fetch.and.returnValue(Promise.reject(new Error('Network error')));
    try {
      await fetchRestaurantDetails('1');
    } catch (error) {
      expect(error.message).toEqual('Network error');
    }
  });
});

describe('createErrorElement', () => {
  it('harus membuat element error seperti ini', () => {
    const message = 'Error terjadi';
    const result = createErrorElement(message);

    expect(result.textContent).toBe(message);
    expect(result.style.color).toBe('red');
    expect(result.tagName).toBe('DIV');
  });
});
