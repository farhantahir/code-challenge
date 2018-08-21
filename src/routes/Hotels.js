/**
 * Hotels' API End Points
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  const PATH = 'hotels';

  router.get('/test', (req, res) => {
    res.json({});
  });

  return {
    PATH,
    router
  }
};