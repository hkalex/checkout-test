import ShoppingCart from './src/ShoppingCart';
import { pricingRules } from './src/pricingRules';

export function commandLineHandler(argv, ShoppingCart, logger) {
  if (argv.length < 3) {
    throw 'Please read readme.md for the usage'
  }

  const cart = ShoppingCart.new(pricingRules);

  const items = argv[2];
  const productCodes = items.split(',');

  productCodes.forEach((v, i, a) => {
    if (v) {
      if (v.indexOf('|')) {
        // handle promoCode
        let parts = v.split('|');
        cart.add(parts[0], parts[1]);
      } else {
        cart.add(v);
      }
    }
  });

  logger(`Total: ${cart.total}`);
  let cartItems = cart.items;

  for (let productCode in cartItems) {
    if (productCode) {
      let item = cartItems[productCode];
      logger(`${item.qty} x ${item.productName}`)
    }
  }
}



if (typeof require !== 'undefined' && require.main === module) {
  commandLineHandler(process.argv, ShoppingCart, console.log);
}
