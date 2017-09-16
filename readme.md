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
node index "ult_small,1gb|I<3AMAYSIM"
```

