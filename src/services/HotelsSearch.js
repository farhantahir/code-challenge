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
  async search() {
    const hotels = await this.fetchHotels();
    this.searchEngine.addData(hotels);
    /**
     * Following filters are only for testing and runing
     * further code
     */
    const OPTS = this.searchEngine.OPTS;
    const testFilters = {
      name: {
        opt: OPTS.regex,
        val: 'One'
      },
      city: {
        opt: OPTS.eq,
        val: 'dubai'
      },
      price: {
        opt: OPTS.btwe,
        val: [7, 200]
      }
    };
    const filteredHotes = this.searchEngine.search(testFilters);
    console.log(filteredHotes, 'hotels')
    return filteredHotes;
  }
}

module.exports = HotelsSearch;