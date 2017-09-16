const DEFAULT_SERVICES = require('./services');

class ShoppingCart {
  constructor(pricingRules = null, services = null) {
    this.services = Object.assign({}, DEFAULT_SERVICES, services);
    this.pricingRules = pricingRules;

    this.priceList = this.services.priceList;
    this.cartItems = {};
  }

  add(productCode, promoCode) {
    // check if the productCode exists
    if (!this.priceList.hasOwnProperty(productCode)) {
      throw `ProductCode "${productCode}" does not exist in the price list`
    }

    if (this.cartItems[productCode]) {
      this.cartItems[productCode].qty++;
      this.cartItems[productCode].subTotal += this.priceList[productCode].price;
    } else {
      this.cartItems[productCode] = {
        qty: 1,
        productName: this.priceList[productCode].productName,
        subTotal: this.priceList[productCode].price
      }
    }

    if (promoCode) {
      this.cartItems[productCode].promoCode = promoCode;
    }
  }

  get total() {
    // apply all the pricing rules
    for (let i = 0, l = this.pricingRules.length; i < l; i++) {
      this.pricingRules[i].applyRule(this.cartItems);
    }

    let result = 0;
    for (let productCode in this.cartItems) {
      result += this.cartItems[productCode].subTotal
    }
    return result.toFixed(2);
  }

  get items() {
    return this.cartItems;
  }
}


ShoppingCart.new = function (pricingRules, services = null) {
  return new ShoppingCart(pricingRules, services);
}

module.exports = ShoppingCart;
