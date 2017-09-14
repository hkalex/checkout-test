import DEFAULT_SERVICES from '../services';

export default class Combo {
  constructor(definition, services = null) {
    /**
     * definition should be a JSON object like
     * {
     *   productCode: string,
     *   qty: int
     *   bundleProductCode: string,
     *   bundleQty: int
     * }
     */
    this._validateDefinition(definition);
    this.definition = definition;
    this.services = Object.assign({}, DEFAULT_SERVICES, services);
  }

  _validateDefinition(definition) {
    if (!definition) throw '"definition" argument cannot be null.';
    if (!definition.hasOwnProperty('productCode') ||
      !definition.hasOwnProperty('qty') ||
      !definition.hasOwnProperty('bundleProductCode') ||
      !definition.hasOwnProperty('bundleQty')) {
      throw '"definition" must be the format {productCode:string, qty:int, bundleProductCode:string, bundleQty:int}';
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
    if (!cartItems) return;
    let cartItem = cartItems[this.definition.productCode];
    if (!cartItem) return;

    debugger;

    let extraBundle = Math.floor(cartItem.qty / this.definition.qty) * this.definition.bundleQty;

    if (extraBundle) {
      let targetItem = cartItems[this.definition.bundleProductCode];
      if (targetItem) {
        targetItem.qty += extraBundle;
      } else {
        cartItems[this.definition.bundleProductCode] = {
          qty: extraBundle,
          subTotal: 0
        }
      }
    }


  }
}