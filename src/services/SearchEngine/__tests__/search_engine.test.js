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
    const expected = Field.createFields(fields);
    expect(searchEngine.setFields(fields)).toMatchObject(expected);
  });

  /**
   * Test setSortFields of searchEngine
   */
  test('Test setSortFields method of searchEngine', () => {
    expect(searchEngine.setSortFields(sortFields)).toEqual(expect.arrayContaining(sortFields));
  });

  /**
   * Test addData of search Engine
   */
  test('Test addData method of searchEngine', () => {
    expect(searchEngine.addData(data)).toEqual(expect.arrayContaining(data));
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