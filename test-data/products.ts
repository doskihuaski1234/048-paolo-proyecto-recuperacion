export const products = [
  { name: 'Sauce Labs Backpack', price: '$29.99', suffix: 'sauce-labs-backpack' },
  { name: 'Sauce Labs Bike Light', price: '$9.99', suffix: 'sauce-labs-bike-light' },
  { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', suffix: 'sauce-labs-bolt-t-shirt' },
  { name: 'Sauce Labs Fleece Jacket', price: '$49.99', suffix: 'sauce-labs-fleece-jacket' },
  { name: 'Sauce Labs Onesie', price: '$7.99', suffix: 'sauce-labs-onesie' },
  { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', suffix: 'test.allthethings()-t-shirt-(red)' },
] as const;

export const sortOptions = {
  az: {
    names: [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ],
    prices: ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99'],
  },
  za: {
    names: [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ],
    prices: ['$15.99', '$7.99', '$49.99', '$15.99', '$9.99', '$29.99'],
  },
  lohi: {
    names: [
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ],
    prices: ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99'],
  },
  hilo: {
    names: [
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie',
    ],
    prices: ['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99'],
  },
} as const;
