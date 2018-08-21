/**
 * Main entry file for application's code
 */

const config = require('config');

module.exports = function(app) {
  require('./routes')(app, config.URI_Prefix);
};