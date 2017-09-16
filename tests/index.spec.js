import assert from 'assert';

import { commandLineHandler } from '../index';

var argv = [
  'node',
  'index'
]

var cartItems = {};
const mockShoppingCart = class {
  add(productCode, promoCode) {
    if (cartItems[productCode]) {
      cartItems[productCode].qty++;
    } else {
      cartItems[productCode] = {
        qty: 1,
        productName: productCode === 'p1' ? 'P1' : 'P2'
      }
    }
    if (promoCode) {
      cartItems[productCode].promoCode = promoCode;
    }
  }
  get total() {
    let result = 0;
    for (let key in cartItems) {
      result += cartItems[key].qty;
    }
    return result;
  }
  get items() {
    return cartItems;
  }
}

const singleton = new mockShoppingCart({});
mockShoppingCart.new = function (pricingRules) {
  return singleton;
}


var logs = [];
const mockLogger = function (msg) {
  logs.push(msg);
  return msg;
}




describe('index', function () {
  beforeEach(function () {
    // refresh everything
    argv = [
      'node',
      'index'
    ];
    cartItems = {};
    logs = [];
  });

  it('run with error if no argument', function () {
    try {
      commandLineHandler(argv, mockShoppingCart, mockLogger);
      assert.fail('Error expected');
    } catch (ex) {
      // do nothing
    }
  })

  it('run with "p1"', function () {
    argv.push('p1');
    commandLineHandler(argv, mockShoppingCart, mockLogger);
    assert.equal(cartItems.hasOwnProperty('p1'), true);
    assert.equal(cartItems.p1.qty, 1);

    // check print out result
    assert.equal(logs.length, 2);
    assert.equal(logs[0], 'Total: 1');
    assert.equal(logs[1], '1 x P1');
  })

  it('run with "p1,p1"', function () {
    argv.push('p1,p1');
    commandLineHandler(argv, mockShoppingCart, mockLogger);
    assert.equal(cartItems.hasOwnProperty('p1'), true);
    assert.equal(cartItems.p1.qty, 2);

    // check print out result
    assert.equal(logs.length, 2);
    assert.equal(logs[0], 'Total: 2');
    assert.equal(logs[1], '2 x P1');
  })

  it('run with "p1,p1,p2"', function () {
    argv.push('p1,p1,p2');
    commandLineHandler(argv, mockShoppingCart, mockLogger);
    assert.equal(cartItems.hasOwnProperty('p1'), true);
    assert.equal(cartItems.hasOwnProperty('p2'), true);
    assert.equal(cartItems.p1.qty, 2);
    assert.equal(cartItems.p2.qty, 1);

    // check print out result
    assert.equal(logs.length, 3);
    assert.equal(logs[0], 'Total: 3');
    assert.equal(logs[1], '2 x P1');
    assert.equal(logs[2], '1 x P2');
  })

  it('run with "p1|PPP,p1,p2"', function () {
    argv.push('p1|PPP,p1,p2');
    commandLineHandler(argv, mockShoppingCart, mockLogger);
    assert.equal(cartItems.hasOwnProperty('p1'), true);
    assert.equal(cartItems.hasOwnProperty('p2'), true);
    assert.equal(cartItems.p1.qty, 2);
    assert.equal(cartItems.p1.promoCode, 'PPP');
    assert.equal(cartItems.p2.qty, 1);

    // check print out result
    assert.equal(logs.length, 3);
    assert.equal(logs[0], 'Total: 3');
    assert.equal(logs[1], '2 x P1');
    assert.equal(logs[2], '1 x P2');
  })

  it('run with "p1|PPP,p1,p2|QQQ"', function () {
    argv.push('p1|PPP,p1,p2|QQQ');
    commandLineHandler(argv, mockShoppingCart, mockLogger);
    assert.equal(cartItems.hasOwnProperty('p1'), true);
    assert.equal(cartItems.hasOwnProperty('p2'), true);
    assert.equal(cartItems.p1.qty, 2);
    assert.equal(cartItems.p1.promoCode, 'PPP');
    assert.equal(cartItems.p2.qty, 1);
    assert.equal(cartItems.p2.promoCode, 'QQQ');

    // check print out result
    assert.equal(logs.length, 3);
    assert.equal(logs[0], 'Total: 3');
    assert.equal(logs[1], '2 x P1');
    assert.equal(logs[2], '1 x P2');
  })


})