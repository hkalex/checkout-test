import DEFAULT_SERVICES from '../services';


export default class Volume {
  constructor(definition, services = null) {
    this._validateDefinition(definition);
    this.definition = definition;
    this.services = Object.assign({}, DEFAULT_SERVICES, services);
  }

  _validateDefinition(definition) {
    /**
     * definition must be
     * {
     *   productCode: string,
     *   qty: int,
     *   newPrice: decimal
     * }
     */
    if (!definition) throw 'Definition cannot be null';
    if (!definition.hasOwnProperty('productCode') || !definition.hasOwnProperty('qty') || !definition.hasOwnProperty('newPrice')) throw 'Definition must be {productCode:string, qty:int, newPrice: decimal} JSON';
  }

  applyRule(cartItems) {
    /**
     * cartItems is an JSON object
     * {
     *   "<productCode>": {
     *     qty: int,
     *     subTotal: decimal
     *   }
     * }
     */
    if (!cartItems) return;
    if (!cartItems[this.definition.productCode]) return;

    let cartItem = cartItems[this.definition.productCode];

    if (cartItem.qty >= this.definition.qty) {
      cartItem.subTotal = this.definition.newPrice * cartItem.qty;
    }
  }
}