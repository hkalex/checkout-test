import DEFAULT_SERVICES from '../services';

export default class Combo {
  constructor(definition, services = null) {
    /**
     * definition should be a JSON object like
     * {
     *   productCode: string,
     *   buy: int,
     *   free: int
     * }
     */
    this._validateDefinition(definition);
    this.definition = definition;
    this.services = services || DEFAULT_SERVICES;
  }

  _validateDefinition(definition) {
    if (!definition) throw '"definition" argument cannot be null.';
    if (!definition.hasOwnProperty('productCode') ||
      !definition.hasOwnProperty('buy') ||
      !definition.hasOwnProperty('free')) {
      throw '"definition" must be the format {productCode:string, buy:int, free:int}';
    }
  }

  apply(cartItems) {
    /**
     * cartItems is an JSON object
     * {
     *   "<productCode>": {
     *     qty: int,
     *     subTotal: decimal
     *   }
     * }
     */
    let cartItem = cartItems[this.definition.productCode];
    if (!cartItem) return null;

    let comboCount = this.definition.buy + this.definition.free;
    let originalPrice = this.services.priceList[this.definition.productCode].price;
    let comboPrice = originalPrice * this.definition.buy;

    debugger;

    let newSubTotal = (Math.floor(cartItem.qty / comboCount) * comboPrice)
    newSubTotal += ((cartItem.qty % comboCount) * originalPrice);
    cartItem.subTotal = newSubTotal;
  }
}