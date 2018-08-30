/**
 * Hotels Controller Class
 */

const HotelsSearch = require('../services/HotelsSearch');
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
    const {
      name,
      city,
      price,
      date,
      sort_field,
      sort_order
    } = req.query;
    const hotels = await this.hotelsSearch.search(
      {
        name,
        city,
        price,
        date
      },
      {
        sort_field: sort_order
      }
    );
    res.json({ hotels });
  }

}

module.exports = HotelsController;