import assert from 'assert';

import '../src/prototypes';
import ShoppingCart from '../src/ShoppingCart';

var mockServices = {
  priceList: {
    p1: {
      productName: 'P1',
      price: 100
    },
    p2: {
      productName: 'P2',
      price: 200
    },
    p3: {
      productName: 'P3',
      price: 300
    }
  }
}

let dummyPricingRules = [
  {
    applyRule: function (cartItems) {
      if (cartItems.p1) {
        cartItems.p1.applied = true;
      }
    }
  },
  {
    applyRule: function (cartItems) {
      if (cartItems.p2) {
        cartItems.p2.applied = true;
      }
    }
  }
]



describe('ShoppingCart', function () {
  it('checkout process', function () {
    let cart = new ShoppingCart(dummyPricingRules, mockServices);
    cart.add('p1');

    let cartItems = cart.items;
    assert.equal(cartItems.p1.qty, 1);
    assert.equal(cartItems.p1.subTotal, 100);

    cart.add('p1');

    cartItems = cart.items;
    assert.equal(cartItems.p1.qty, 2);
    assert.equal(cartItems.p1.subTotal, 200);

    cart.add('p2');
    cartItems = cart.items;
    assert.equal(cartItems.p2.qty, 1);
    assert.equal(cartItems.p2.subTotal, 200);

    cart.add('p2');
    cartItems = cart.items;
    assert.equal(cartItems.p2.qty, 2);
    assert.equal(cartItems.p2.subTotal, 400);

    // check promoCode applied
    cart.add('p3', 'PPP');
    cartItems = cart.items;
    assert.equal(cartItems.p3.promoCode, 'PPP');

    var total = cart.total;
    assert.equal(total, 900);

    // ensure the PricingRules are called
    cartItems = cart.items;
    assert.equal(cartItems.p1.applied, true);
    assert.equal(cartItems.p2.applied, true);
    
    
  })
})