/**
 * The main entry file for the application
 */

const cluster = require('cluster');
const os = require('os');

/**
 * Getting noOfCores available from available cpus
 */
const noOfCores = os.cpus().length;


/**
 * @todo Instead of adding process.env.NODE_ENV, use configuration to detect environment.
 */
if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  console.info(`[Master] Total cores: ${noOfCores}`);
  [...Array(noOfCores)].forEach(() => cluster.fork());
} else {
  require('./server');
}