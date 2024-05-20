/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Liking and unlike Restaurant', ({ I }) => {
  I.seeElement('.card');
  I.see('More Details', '#details-btn');
  I.click('//a[contains(@href, "1knt6za9kkfw1e867")]');
  I.seeInCurrentUrl('/details-restaurant.html?id=s1knt6za9kkfw1e867');
  I.seeElement('#btn-favorite');
  I.see('Add To Favorite +', '#btn-favorite');
  I.click('#btn-favorite');
  I.see('Remove From Favorite -', '#btn-favorite');
  I.click('#btn-favorite');
  I.see('Add To Favorite +', '#btn-favorite');
  I.click('#btn-favorite');
  I.see('Remove From Favorite -', '#btn-favorite');
  I.click('//a[contains(@href, "/favorite.html")]');
  I.seeInCurrentUrl('/favorite.html');
  I.see('More Details', '#details-btn');
  I.click('//a[contains(@href, "1knt6za9kkfw1e867")]');
});
