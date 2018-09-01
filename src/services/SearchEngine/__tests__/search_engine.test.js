const SearchEngine = require('../index');
const Field = require('../Field');

/**
 * Data to use in test
 */
const data = [
  {
    name: 'Media One Hotel',
    price: 102.2,
    city: 'dubai',
    availability: [
      { from: '10-10-2020', to: '15-10-2020' },
      { from: '25-10-2020', to: '15-11-2020' },
      { from: '10-12-2020', to: '15-12-2020' }
    ]
  },
  {
    name: 'Rotana Hotel',
    price: 80.6,
    city: 'cairo',
    availability: [
      { from: '10-10-2020', to: '12-10-2020' },
      { from: '25-10-2020', to: '10-11-2020' },
      { from: '05-12-2020', to: '18-12-2020' }
    ]
  },
  {
    name: 'Le Meridien',
    price: 89.6,
    city: 'london',
    availability: [
      { from: '01-10-2020', to: '12-10-2020' },
      { from: '05-10-2020', to: '10-11-2020' },
      { from: '05-12-2020', to: '28-12-2020' }
    ]
  },
  {
    name:
      'Golden Tulip',
    price: 109.6,
    city: 'paris',
    availability: [
      { from: '04-10-2020', to: '17-10-2020' },
      { from: '16-10-2020', to: '11-11-2020' },
      { from: '01-12-2020', to: '09-12-2020' }
    ]
  }
];

describe('Search Engine service test', () => {

  const searchEngine = new SearchEngine();
  const { STRING, NUMBER, ARRAY_OF_OBJECTS } = searchEngine.fieldTypes;
  const OPTS = searchEngine.OPTS;
  const fields = {
    name: { type: STRING },
    city: { type: STRING },
    price: { type: NUMBER },
    availability: { type: ARRAY_OF_OBJECTS, multiValue: true }
  };
  const sortFields = ['name', 'price'];

  /**
   * Test setFields of searchEngine
   */
  test('Test setFields method of searchEngine', () => {
    
    const expected = Object.keys(fields).reduce((obj, fieldName) => {
      const { type, multiValue } = fields[fieldName];
      obj[fieldName] = new Field(fieldName, type, multiValue);
      return obj;
    }, {});

    expect(searchEngine.setFields(fields)).toMatchObject(expected);
  });

  /**
   * Test setSortFields of searchEngine
   */
  test('Test setSortFields method of searchEngine', () => {
    const expected = sortFields;
    expect(searchEngine.setSortFields(sortFields)).toEqual(expect.arrayContaining(sortFields));
  });

  /**
   * Test addData of search Engine
   */
  test('Test addData method of searchEngine', () => {
    const expected = data;
    expect(searchEngine.addData(data)).toEqual(expect.arrayContaining(expected));
  });

  /**
   * Test Search of search Engine
   */
  test('Test search method of searchEngine', () => {
    const expected = [
      {
        name: 'Rotana Hotel',
        price: 80.6,
        city: 'cairo',
        availability: [
          { from: '10-10-2020', to: '12-10-2020' },
          { from: '25-10-2020', to: '10-11-2020' },
          { from: '05-12-2020', to: '18-12-2020' }
        ]
      }
    ];

    const filters = {
      name: {
        opt: OPTS.regex,
        val: 'rotana hotel'
      },
      city: {
        opt: OPTS.eq,
        val: 'cairo'
      },
      price: {
        opt: OPTS.btwe,
        val: [60, 100]
      },
      availability: {
        from: {
          opt: OPTS.eq,
          val: '10-10-2020'
        },
        to: {
          opt: OPTS.eq,
          val: '12-10-2020'
        }
      }
    };

    const sort = {
      field: 'name',
      order: 'desc'
    };
    expect(searchEngine.search(filters, sort)).toEqual(expect.arrayContaining(expected));
  });
});