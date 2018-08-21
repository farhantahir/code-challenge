/**
 * Main file for all routes
 */

module.exports = (app, prefix = '') => {
  /**
   * Array of Routes' file names to load routes in application
   */
  [
    'Hotels'
  ]
    .forEach(r => {
      const { PATH, router } = require(`./${r}`)();
      const routePrefix = prefix ? `/${prefix}` : '';
      app.use(`${routePrefix}/${PATH}`, router);
    });
};