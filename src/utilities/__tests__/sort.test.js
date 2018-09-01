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

describe('sort array of objects by string or number type field', () => {

  /**
   * Sorts array of objects by a string field in asc order
   */
  test('Sorts objects by string field in ASC order', () => {
    expect(strSort(DATA, 'name'))
      .toEqual(expect.arrayContaining(EXPECTED_STR_ASC_NUM_DESC));
  });

  /**
   * Sorts array of objects by a string field in desc order
   */
  test('Sorts objects by string field in DESC order', () => {
    expect(strSort(DATA, 'name', 'desc'))
      .toEqual(expect.arrayContaining(EXPECTED_STR_DESC_NUM_ASC));
  });

  /**
   * Sorts array of objects by number field in asc
   */
  test('Sorts objects by number field in ASC', () => {
    expect(numSort(DATA, 'name'))
      .toEqual(expect.arrayContaining(EXPECTED_STR_DESC_NUM_ASC));
  });

  /**
   * Sorts array of objects by number field in desc order
   */
  test('Sorts objects by number field in DESC order', () => {
    expect(numSort(DATA, 'name', 'desc'))
      .toEqual(expect.arrayContaining(EXPECTED_STR_ASC_NUM_DESC));
  });

});
