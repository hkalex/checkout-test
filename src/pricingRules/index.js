const Combo = require('./Combo');
const Bundle = require('./Bundle');
const Volume = require('./Volume');
const PromoCode = require('./PromoCode');

const pricingRules = [
  new Combo({
    productCode: 'ult_small',
    buy: 2,
    free: 1
  }),
  new Volume({
    productCode: 'ult_large',
    qty: 4,
    newPrice: 39.90
  }),
  new Bundle({
    productCode: 'ult_medium',
    qty: 1,
    bundleProductCode: '1gb',
    bundleQty: 1
  }),
  new PromoCode({
    promoCode: 'I<3AMAYSIM',
    percentage: 0.9 // means 10% off
  })
]

module.exports = {
  Combo, Bundle, Volume, PromoCode, pricingRules
}
