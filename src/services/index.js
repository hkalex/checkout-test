import PricingRules from '../pricingRules';

export var priceList = {
  "ult_small": {
    productName: 'Unlimited 1GB',
    price: 24.9
  },
  "ult_medium": {
    productName: 'Unlimited 2GB',
    price: 29.9
  },
  "ult_large": {
    productName: 'Unlimited 5GB',
    price: 44.9
  },
  "1gb": {
    productName: '1 GB Data-pack',
    price: 9.9
  }
};


export var pricingRules = [
  new PricingRules.Combo({
    productCode: 'ult_small',
    buy: 2,
    free: 1
  }),
  new PricingRules.Volume({
    productCode: 'ult_large',
    qty: 4,
    newPrice: 39.90
  }),
  new PricingRules.Bundle({
    productCode: 'ult_medium',
    qty: 1,
    bundleProductCode: '1gb',
    bundleQty: 1
  }),
  new PricingRules.PromoCode({
    promoCode: 'I<3AMAYSIM',
    percentage: 0.9 // means 10% off
  })
]


