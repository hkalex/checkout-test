import assert from 'assert';

import '../src/prototypes';
import Volume from '../src/PricingRules/Volume';


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

var p1HalfPriceIf5OrMore = {
  productCode: 'p1',
  qty: 5,
  newPrice: 50
};

describe('Volume', function () {
  describe('Constructor', function () {
    it('throws exception if definition is wrong - empty JSON object', function () {
      try {
        new Volume({});
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing product code', function () {
      try {
        new Volume({
          product_Code: 'xxx',
          qty: 2,
          newPrice: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing qty', function () {
      try {
        new Volume({
          productCode: 'xxx',
          q_ty: 2,
          newPrice: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing newPrice', function () {
      try {
        new Volume({
          productCode: 'xxx',
          qty: 2,
          new__Price: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });

    it('create Volume if definition is correct', function () {
      try {
        new Volume(p1HalfPriceIf5OrMore);
      } catch (ex) {
        assert.fail(ex);
      }
    });

  });
  describe('apply', function () {
    it('Volume - buy 4 p1 with $400', function () {
      var instance = new Volume(p1HalfPriceIf5OrMore, mockServices);

      var cartItems = {
        'p1': {
          qty: 4,
          subTotal: 400
        }
      }

      var newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 400); // after apply
    });

    it('Volume - buy 5 p1 with $250', function () {
      var instance = new Volume(p1HalfPriceIf5OrMore, mockServices);

      var cartItems = {
        'p1': {
          qty: 5,
          subTotal: 500
        }
      }

      var newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 250); // after apply
    });

    it('Volume - buy 6 p1 with $300', function () {
      var instance = new Volume(p1HalfPriceIf5OrMore, mockServices);

      var cartItems = {
        'p1': {
          qty: 6,
          subTotal: 600
        }
      }

      var newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 300); // after apply
    });



  });



})

