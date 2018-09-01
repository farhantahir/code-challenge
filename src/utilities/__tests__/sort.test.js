const { strSort, numSort } = require('../sort');

const data = [
  { "name": "Rotana Hotel", "price": 80.6 },
  { "name": "Media One Hotel", "price": 102.2 },
];


describe('sort array of objects by string or number type field', () => {

  /**
   * Sorts array of objects by a string field in asc order
   */
  test('Sorts objects by string field', () => {
    const expected = [
      { "name": "Media One Hotel", "price": 102.2 },
      { "name": "Rotana Hotel", "price": 80.6 },
    ];
    expect(strSort(data, 'name')).toEqual(expect.arrayContaining(expected));
  });

  /**
   * Sorts array of objects by a string field in desc order
   */
  test('Sorts objects by string field', () => {
    const expected = [
      { "name": "Rotana Hotel", "price": 80.6 },
      { "name": "Media One Hotel", "price": 102.2 }
    ];
    expect(strSort(data, 'name', 'desc')).toEqual(expect.arrayContaining(expected));
  });

  /**
   * Sorts array of objects by number field in asc
   */
  test('Sorts objects by number field', () => {
    const expected = [
      { "name": "Rotana Hotel", "price": 80.6 },
      { "name": "Media One Hotel", "price": 102.2 }
    ];
    expect(strSort(data, 'name')).toEqual(expect.arrayContaining(expected));
  });

  /**
   * Sorts array of objects by number field in desc order
   */
  test('Sorts objects by number field', () => {
    const expected = [
      { "name": "Media One Hotel", "price": 102.2 },
      { "name": "Rotana Hotel", "price": 80.6 }
    ];
    expect(strSort(data, 'name', 'desc')).toEqual(expect.arrayContaining(expected));
  });

});
