/**
 * The main entry file for the application
 */

const cluster = require('cluster');
const os = require('os');
const dotenv = require('dotenv');
const path = require('path');

/**
 * Load .env file into process.env using dotenv module
 */
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Set NODE_CONFIG_DIR for config module to load envrionment configurations.
 */
process.env["NODE_CONFIG_DIR"] = __dirname + '/../config/';

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