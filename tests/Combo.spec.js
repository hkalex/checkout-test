import assert from 'assert';

import '../src/prototypes';
import Combo from '../src/PricingRules/Combo';


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

var p1Buy2Get1Free = {
  productCode: 'p1',
  buy: 2,
  free: 1
};

describe('Combo', function () {
  describe('Constructor', function () {
    it('throws exception if definition is wrong - empty JSON object', function () {
      try {
        new Combo({});
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing product code', function () {
      try {
        new Combo({
          product_Code: 'xxx',
          buy: 2,
          free: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing buy', function () {
      try {
        new Combo({
          productCode: 'xxx',
          bu_y: 2,
          free: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing free', function () {
      try {
        new Combo({
          productCode: 'xxx',
          buy: 2,
          fr_ee: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });

    it('create Combo if definition is correct', function () {
      try {
        new Combo(p1Buy2Get1Free);
      } catch (ex) {
        assert.fail(ex);
      }
    });

  });
  describe('apply', function () {
    it('Combo - buy 2 p1 with $200', function () {
      var combo = new Combo(p1Buy2Get1Free, mockServices);

      var cartItems = {
        'p1': {
          qty: 2,
          subTotal: 200
        }
      }

      var newItems = combo.apply(cartItems);
      assert.equal(cartItems.p1.subTotal, 200); // after apply
    });

    it('Combo - buy 3 p1 with $200', function () {
      var combo = new Combo(p1Buy2Get1Free, mockServices);

      var cartItems = {
        'p1': {
          qty: 3,
          subTotal: 300
        }
      }

      var newItems = combo.apply(cartItems);
      assert.equal(cartItems.p1.subTotal, 200); // after apply
    });
    it('Combo - buy 6 p1 with $400', function () {
      var combo = new Combo(p1Buy2Get1Free, mockServices);

      var cartItems = {
        'p1': {
          qty: 6,
          subTotal: 600
        }
      }

      var newItems = combo.apply(cartItems);
      assert.equal(cartItems.p1.subTotal, 400); // after apply
    });
    it('Combo - buy 7 p1 with $500', function () {
      var combo = new Combo(p1Buy2Get1Free, mockServices);

      var cartItems = {
        'p1': {
          qty: 7,
          subTotal: 700
        }
      }

      var newItems = combo.apply(cartItems);
      assert.equal(cartItems.p1.subTotal, 500); // after apply
    });
  });



})

