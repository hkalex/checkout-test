import DEFAULT_SERVICES from './services';


export default class ShoppingCart {
  constructor(pricingRules = null, services = null) {
    this.services = Object.assign({}, DEFAULT_SERVICES, services);
    this.pricingRules = pricingRules;

    this.priceList = this.services.priceList;
    this.cartItems = {};
  }

  add(productCode, promoCode) {
    if (this.cartItems[productCode]) {
      this.cartItems[productCode].qty++;
      this.cartItems[productCode].subTotal += this.priceList[productCode].price;
    } else {
      this.cartItems[productCode] = {
        qty: 1,
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

