/* eslint-disable no-undef */
Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/details-restaurant.html?id=s1knt6za9kkfw1e867');
});

Scenario('Liking and unlike Restaurant', ({ I }) => {
  I.seeElement('.container-form');
  I.focus('#name');
  I.type('nama-test');
  I.focus('#review');
  I.type('Mainya bagus sekali!!');
  I.click('.btn-submit');
  I.wait(3);
  I.see('Mainya bagus sekali!!', '.review-text');
});
