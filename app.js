/**
 * Creates and exports express app.
 */

const express = require('express');
const config = require('config');
const app = express();

/**
 * Add request logger(morgan) based on environment settings.
 */
if (config.logger) {
  app.use(config.logger);
}



// Body Parsing middleware settings.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global middleware for setting response headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Global middleware to catch 404 errors
app.use(function (req, res, next) {
  res.status(404).end();
});

// Global middleware to handle errors
app.use(function (err, req, res, next) {
  res.status(500).send({
    error: err.toString()
  });
});

module.exports = app;