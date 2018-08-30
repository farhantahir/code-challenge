const request = require('request-promise-native');
const config = require('config');
const SearchEngine = require('./SearchEngine');

/**
 * class for Hotels Search service
 */
class HotelsSearch {

  /**   
   * @constructor
   * @property {object} searchEngine Object of SearchEngine Service   
   */
  constructor() {
    this.searchEngine = new SearchEngine();
    const { STRING, NUMBER, ARRAY_OF_OBJECTS } = this.searchEngine.fieldTypes;
    this.fields = {
      name: { type: STRING },
      city: { type: STRING },
      price: { type: NUMBER },
      availability: { type: ARRAY_OF_OBJECTS, multiValue: true }
    };
    this.setSearchEngineFields();
  }

  /**
   * Sets Fields on Search Engine for Hotels Search
   */
  setSearchEngineFields() {
    this.searchEngine.setFields(this.fields);
  }

  /**
   * Fetches hotels' data using HOTES_API_URI and request module.   
   */
  async fetchHotels() {
    let response = await request(config.Hotels_API_URL);
    response = JSON.parse(response);
    return response.hotels || [];
  }

  /**
   * Searches hotels based on filters.
   * @returns {Promise}
   */
  async search(filters) {
    const prepareFilters = this.prepareFilters(filters);
    const hotels = await this.fetchHotels();
    this.searchEngine.addData(hotels);
    return this.searchEngine.search(prepareFilters);
  }

  prepareFilters(filters) {
    const preparedFilters = {};
    const OPTS = this.searchEngine.OPTS;

    /**
     * Preparing Hotel Name filter
     */
    if (filters['name']) {
      preparedFilters['name'] = {
        opt: OPTS.regex,
        val: filters['name']
      };
    }

    /**
     * Preparing Hotel City filter
     */
    if (filters['city']) {
      preparedFilters['city'] = {
        opt: OPTS.eq,
        val: filters['city']
      };
    }

    /**
     * Preparing Hotel Price filter
     */
    if (filters['price']) {
      /**
       * Split price by : if more than two values like 100:200 are provided
       * Run range filter otherwise run greater filter
       */
      const priceFilter = filters['price'].split(':');
      if (priceFilter.length > 1) {
        preparedFilters['price'] = {
          opt: OPTS.btwe,
          val: [
            priceFilter[0],
            priceFilter[1]
          ]
        };
      } else {
        preparedFilters['price'] = {
          opt: OPTS.gt,
          val: priceFilter[0]
        };
      }
    }

    if (filters['date']) {
      /**
       * Split date by : if more than two values like 10-10-2020:15-10-2020 are provided
       * Run range filter otherwise run greater filter
       */
      const dateFilter = filters['date'].split(':');
      if (dateFilter.length > 1) {
        preparedFilters['availability'] = {
          from: {
            opt: OPTS.eq,
            val: dateFilter[0]
          },
          to: {
            opt: OPTS.eq,
            val: dateFilter[1]
          },
        };
      } else {
        preparedFilters['availability'] = {
          from: {
            opt: OPTS.gt,
            val: dateFilter[0]
          }
        };
      }
    }

    return preparedFilters;
  }
}

module.exports = HotelsSearch;