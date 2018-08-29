const request = require('request-promise-native');
const config = require('config');
const SearchEngine = require('./searchEngine');

/**
 * class for Hotels Search service
 */
class HotelsSearch {
  /**
   * Constructor
   * @property {object} searchEngine Object of SearchEngine Service   
   */
  constructor() {    
    this.searchEngine = new SearchEngine();        
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
    console.log(hotels, 'hotels')
    return hotels;
  }
}

module.exports = HotelsSearch;