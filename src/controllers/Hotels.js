/**
 * Hotels Controller Class
 */

const HotelsSearch = require('../services/hotelsSearch');
class HotelsController {

  /**
   * Constructor function
   */
  constructor() {
    this.hotelsSearch = new HotelsSearch();
    this.search = this.search.bind(this);
  }

  /**
   * Hotels search handler
   * @param {object} req 
   * @param {object} res 
   */
  async search(req, res) {
    await this.hotelsSearch.search();
    res.json({ status: true });
  }

}

module.exports = HotelsController;