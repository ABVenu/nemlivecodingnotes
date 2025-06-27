const sum = require('./sum');

/// jest testing syntax

/// test is an fn which takes 2 parametrs 
// 1st is test description 
// 2nd is CBF where core code testing is done
test('First Test Case', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Second Test Case', () => {
  expect(sum(2, 2)).toBe(2);
});


const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('Third Test Case', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});