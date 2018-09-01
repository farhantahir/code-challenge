const { strSort, numSort } = require('../sort');

const DATA = [
  { "name": "Rotana Hotel", "price": 80.6 },
  { "name": "Media One Hotel", "price": 102.2 },
];


const EXPECTED_STR_ASC_NUM_DESC = [
  { "name": "Media One Hotel", "price": 102.2 },
  { "name": "Rotana Hotel", "price": 80.6 },
];

const EXPECTED_STR_DESC_NUM_ASC = [
  { "name": "Rotana Hotel", "price": 80.6 },
  { "name": "Media One Hotel", "price": 102.2 }
];

const testFunction = (fn, data, field, order, expected) => {
  expect(fn(data, field, order))
    .toEqual(expect.arrayContaining(expected));
}

describe('sort array of objects by string or number type field', () => {

  /**
   * Sorts array of objects by a string field in asc order
   */
  test('Sorts objects by string field in ASC order', () => {
    testFunction(strSort, DATA, 'name', 'asc', EXPECTED_STR_ASC_NUM_DESC)
  });

  /**
   * Sorts array of objects by a string field in desc order
   */
  test('Sorts objects by string field in DESC order', () => {
    testFunction(strSort, DATA, 'name', 'desc', EXPECTED_STR_DESC_NUM_ASC)
  });

  /**
   * Sorts array of objects by number field in asc
   */
  test('Sorts objects by number field in ASC order', () => {
    testFunction(numSort, DATA, 'price', 'asc', EXPECTED_STR_DESC_NUM_ASC)
  });

  /**
   * Sorts array of objects by number field in desc order
   */
  test('Sorts objects by number field in DESC order', () => {
    testFunction(numSort, DATA, 'price', 'desc', EXPECTED_STR_ASC_NUM_DESC)
  });

});
