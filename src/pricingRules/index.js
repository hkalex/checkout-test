import Combo from './Combo';
import Bundle from './Bundle';
import Volume from './Volume';
import PromoCode from './PromoCode';

export default {
  Combo, Bundle, Volume, PromoCode
}

export const pricingRules = [
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