import assert from 'assert';

import '../src/prototypes';
import Bundle from '../src/PricingRules/Bundle';


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

const buyOneP1GetOneP2Free = {
  productCode: 'p1',
  qty: 1,
  bundleProductCode: 'p2',
  bundleQty: 1
};

const buyfiveP1GetTwoP2Free = {
  productCode: 'p1',
  qty: 5,
  bundleProductCode: 'p2',
  bundleQty: 2
};

describe('Bundle', function () {
  describe('Constructor', function () {
    it('throws exception if definition is wrong - empty JSON object', function () {
      try {
        new Bundle({});
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing product code', function () {
      try {
        new Bundle({
          productC__ode: 'p1',
          qty: 1,
          bundleProductCode: 'p2',
          bundleQty: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing qty', function () {
      try {
        new Bundle({
          productCode: 'p1',
          q__ty: 1,
          bundleProductCode: 'p2',
          bundleQty: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing bundleProductCode', function () {
      try {
        new Bundle({
          productCode: 'p1',
          qty: 1,
          bundlePr__oductCode: 'p2',
          bundleQty: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });
    it('throws exception if definition is wrong - missing bundleQty', function () {
      try {
        new Bundle({
          productCode: 'p1',
          qty: 1,
          bundleProductCode: 'p2',
          bundleQ__ty: 1
        });
        assert.fail('Error expected');
      } catch (ex) {
        // do nothing
      }
    });

    it('create Bundle if definition is correct', function () {
      try {
        new Bundle(buyOneP1GetOneP2Free);
      } catch (ex) {
        assert.fail(ex);
      }
    });

  });
  describe('apply rule buyOneP1GetOneP2Free', function () {
    it('Bundle - buy 1 p1 with $100', function () {
      let instance = new Bundle(buyOneP1GetOneP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 1,
          subTotal: 100
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 100); // after apply
      assert.equal(cartItems.p2.qty, 1);
      assert.equal(cartItems.p2.subTotal, 0);
    });

    it('Bundle - buy 2 p1 with $200', function () {
      let instance = new Bundle(buyOneP1GetOneP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 2,
          subTotal: 200
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 200); // after apply
      assert.equal(cartItems.p2.qty, 2);
      assert.equal(cartItems.p2.subTotal, 0);
    });

    it('Bundle - buy 1 p1 and 1 p2 with $300', function () {
      let instance = new Bundle(buyOneP1GetOneP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 1,
          subTotal: 100
        },
        'p2': {
          qty: 1,
          subTotal: 200
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 100); // after apply
      assert.equal(cartItems.p2.qty, 2);
      assert.equal(cartItems.p2.subTotal, 200);
    });

    it('Bundle - buy 2 p1 and 2 p2 with $600', function () {
      let instance = new Bundle(buyOneP1GetOneP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 2,
          subTotal: 200
        },
        'p2': {
          qty: 2,
          subTotal: 400
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 200); // after apply
      assert.equal(cartItems.p2.qty, 4);
      assert.equal(cartItems.p2.subTotal, 400);
    });





  });

  describe('apply rule buyfiveP1GetTwoP2Free', function () {
    it('Bundle - buy 4 p1', function () {
      let instance = new Bundle(buyfiveP1GetTwoP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 4,
          subTotal: 400
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.subTotal, 400); // after apply
      assert.equal(!!cartItems.p2, false);
    });

    it('Bundle - buy 5 p1', function () {
      let instance = new Bundle(buyfiveP1GetTwoP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 5,
          subTotal: 500
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.qty, 5);
      assert.equal(cartItems.p1.subTotal, 500);
      assert.equal(cartItems.p2.qty, 2);
      assert.equal(cartItems.p2.subTotal, 0);
    });

    it('Bundle - buy 5 p1 and 1 p2 with $300', function () {
      let instance = new Bundle(buyfiveP1GetTwoP2Free, mockServices);

      let cartItems = {
        'p1': {
          qty: 5,
          subTotal: 500
        },
        'p2': {
          qty: 1,
          subTotal: 200
        }
      }

      let newItems = instance.applyRule(cartItems);
      assert.equal(cartItems.p1.qty, 5);
      assert.equal(cartItems.p1.subTotal, 500);
      assert.equal(cartItems.p2.qty, 3);
      assert.equal(cartItems.p2.subTotal, 200);
    });





  });


})

