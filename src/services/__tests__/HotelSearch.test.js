const HotelsSearch = require('../HotelsSearch');
const DATA = [
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

const hotelSearch = new HotelsSearch();
/**
 * Mocking fetchHotels implementation as it uses request to fetch data.
 */
beforeAll(() => {
  jest.spyOn(hotelSearch, 'fetchHotels').mockImplementation(() => DATA);
});

describe('Test Hotel Service', () => {
  const filters = {
    name: 'hotel',
    city: 'dubai',
    price: '60:200',
    date: '10-10-2020:15-10-2020'
  };

  const sort = {
    field: 'price',
    order: 'desc'
  };

  test('Test search method of Hotel Service', async () => {
    const expected = [ DATA[0] ];
    expect.assertions(1);
    const data = await hotelSearch.search(filters, sort);    
    expect(data).toEqual(expect.arrayContaining(expected));
  });

});