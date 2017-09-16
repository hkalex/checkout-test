import assert from 'assert';

import '../src/prototypes';

import ShoppingCart from '../src/ShoppingCart';
import { pricingRules } from '../src/pricingRules';

describe('ShoppingCart.real', function () {
  it('basic case', function () {
    var cart = new ShoppingCart(pricingRules);
    cart.add('ult_small');
    cart.add('ult_medium');
    cart.add('ult_large');
    var total = cart.total;
    assert.equal(total, 99.7);

    var cartItems = cart.items;
    assert.equal(!!cartItems['1gb'], true);
    assert.equal(cartItems['1gb'].qty, 1);
  });

  it('Scenario 1', function () {
    var cart = new ShoppingCart(pricingRules);
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_large');

    var total = cart.total;
    assert.equal(total, 94.70);

    var items = cart.items;
    assert.equal(items.hasOwnProperty('ult_small'), true);
    assert.equal(items.hasOwnProperty('ult_medium'), false);
    assert.equal(items.hasOwnProperty('ult_large'), true);
    assert.equal(items.hasOwnProperty('1gb'), false);
    assert.equal(items['ult_small'].qty, 3);
    assert.equal(items['ult_large'].qty, 1);
  });

  it('Scenario 2', function () {
    var cart = new ShoppingCart(pricingRules);
    cart.add('ult_small');
    cart.add('ult_small');
    cart.add('ult_large');
    cart.add('ult_large');
    cart.add('ult_large');
    cart.add('ult_large');

    var total = cart.total;
    assert.equal(total, 209.40);

    var items = cart.items;
    assert.equal(items.hasOwnProperty('ult_small'), true);
    assert.equal(items.hasOwnProperty('ult_medium'), false);
    assert.equal(items.hasOwnProperty('ult_large'), true);
    assert.equal(items.hasOwnProperty('1gb'), false);
    assert.equal(items['ult_small'].qty, 2);
    assert.equal(items['ult_large'].qty, 4);
  });

  it('Scenario 3', function () {
    var cart = new ShoppingCart(pricingRules);
    cart.add('ult_small');
    cart.add('ult_medium');
    cart.add('ult_medium');

    var total = cart.total;
    assert.equal(total, 84.70);

    var items = cart.items;
    assert.equal(items.hasOwnProperty('ult_small'), true);
    assert.equal(items.hasOwnProperty('ult_medium'), true);
    assert.equal(items.hasOwnProperty('ult_large'), false);
    assert.equal(items.hasOwnProperty('1gb'), true);
    assert.equal(items['ult_small'].qty, 1);
    assert.equal(items['ult_medium'].qty, 2);
    assert.equal(items['1gb'].qty, 2);
  });

  it('Scenario 4', function () {
    var cart = new ShoppingCart(pricingRules);
    cart.add('ult_small');
    cart.add('1gb', 'I<3AMAYSIM');

    var total = cart.total;
    assert.equal(total, 31.32);

    var items = cart.items;
    assert.equal(items.hasOwnProperty('ult_small'), true);
    assert.equal(items.hasOwnProperty('ult_medium'), false);
    assert.equal(items.hasOwnProperty('ult_large'), false);
    assert.equal(items.hasOwnProperty('1gb'), true);
    assert.equal(items['ult_small'].qty, 1);
    assert.equal(items['1gb'].qty, 1);
  });
});