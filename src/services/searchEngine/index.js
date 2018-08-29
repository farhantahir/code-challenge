/**
 * Class for SearchEngine Service
 */
class SearchEngine {

  /**
   * @constructor
   * @property {array} records Array of objects
   */
  constructor() {
    this.records = [];
  }

  /**
   * Add Data to Search Engine
   * @param {array} data
   */
  addData(records) {
    return this.records = records;
  }

}

module.exports = SearchEngine;