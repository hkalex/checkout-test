import DEFAULT_SERVICES from '../services';

export default class PromoCode {
  constructor(definition, services = null) {
    /**
     * definition should be a JSON object like
     * {
     *   promoCode: string,
     *   percentage: decimal // 0.9 means 10% off
     * }
     */
    this._validateDefinition(definition);
    this.definition = definition;
    this.services = Object.assign({}, DEFAULT_SERVICES, services);
  }

  _validateDefinition(definition) {
    if (!definition) throw '"definition" argument cannot be null.';
    if (!definition.hasOwnProperty('promoCode') ||
      !definition.hasOwnProperty('percentage')) {
      throw '"definition" must be the format {promoCode:string, percentage:decimal}';
    }
  }

  applyRule(cartItems) {
    /**
     * cartItems is an JSON object
     * {
     *   "<productCode>": {
     *     qty: int,
     *     subTotal: decimal,
     *     promoCode: string
     *   }
     * }
     */
    if (!cartItems) return;
    
    let applyPromoCode = false;

    for(let productCode in cartItems) {
      let cartItem = cartItems[productCode];
      if (cartItem.promoCode === this.definition.promoCode) {
        applyPromoCode = true;
        break;
      }
    }

    if (!applyPromoCode) return;

    for(let productCode in cartItems) {
      let cartItem = cartItems[productCode];
      cartItem.subTotal *= this.definition.percentage;
    }
  }
}