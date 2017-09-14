import DEFAULT_SERVICES from '../services';


export default class Volume {
  constructor(definition, services) {
    this._validateDefinition(definition);
    this.definition = definition;
    this.services = services || DEFAULT_SERVICES;
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

  apply(cartItems) {
    /**
     * 
     */
    if (!cartItems) return null;
    if (!cartItems[this.definition.productCode]) return null;

    let cartItems = cartItems[this.definition.productCode];

  }
}