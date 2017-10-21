# Checkout

This is the checkout cart program.

## Prerequisite
You have to install NodeJS version 8. All code are tested in version 8.2.1.

## Install
```
npm install
```

## Run all test cases
```
npm test
```

## Run with manual cases
```
# Scenario 1
node index "ult_small,ult_small,ult_small,ult_large"

# Scenario 2
node index "ult_small,ult_small,ult_large,ult_large,ult_large,ult_large"

# Scenario 3
node index "ult_small,ult_medium,ult_medium"

# Scenario 4
# Pipe line (|) means the promo code
node index "ult_small,1gb|PROMOCODE111"
```


## Project structure
```
- src
  - pricingRules
    - Bundle.js     // handles buy X bundle Y (buy Unlimited 2GB bundle 1GB Datapack free)
    - Combo.js      // handles buy N get M free (buy 2 Unlimited 1GB get 1 Unlimited 1GB free)
    - index.js
    - PromoCode.js  // handles the promotion code
    - Volume.js     // handles the buy N product X with $Q (buy more than 3 Unlimited 5GB, the price will be $39.90)
  - services
    - index.js      // this contains the price list
  - prototypes.js   // ths additional prototype methods on the JavaScript objects
  - ShoppingCart.js // the ShoppingCart logi
- tests             // all the test cases under this folder
  - ...spec.js
- index.js          // handles the command line interface
```


