import assert from 'assert';

import '../src/prototypes';
import PromoCode from '../src/PricingRules/PromoCode';


const mockServices = {
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

const promoCode1 = {
  promoCode: 'p1Promo',
  percentage: 0.9
};


describe('PromoCode', function () {
  describe('Constructor', function () {
    it('throws exception if definition is wrong - empty JSON object', function () {
      try {
        new PromoCode({});
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing promoCode', function () {
      try {
        new PromoCode({
          promo__Code: 'p1',
          percentage: 0.9        
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing percentage', function () {
      try {
        new PromoCode({
          promoCode: 'p1',
          perc_entage: 0.9        
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    
    it('create PromoCode if definition is correct', function () {
      try {
        new PromoCode(promoCode1);
      } catch (ex) {
        assert.fail(ex);
      }
    });

  });
  describe('apply rule promoCode1', function () {
    it('PromoCode - buy 1 p1 with $90', function () {
      let instance = new PromoCode(promoCode1, mockServices);

      let cartItems = {
        'p1': {
          qty: 1,
          subTotal: 100,
          promoCode: 'p1Promo'
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 90);
    });

    it('PromoCode - buy 2 p1 and 2 p2 with $540', function () {
      let instance = new PromoCode(promoCode1, mockServices);

      let cartItems = {
        'p1': {
          qty: 2,
          subTotal: 200,
          promoCode: 'p1Promo'
        },
        'p2': {
          qty: 2,
          subTotal: 400
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.qty, 2);
      assert.equal(cartItems.p1.subTotal, 180);
      assert.equal(cartItems.p2.qty, 2);
      assert.equal(cartItems.p2.subTotal, 360);
    });
  });

})

