/**
 * Hotels' API End Points
 */

const express = require('express');
const router = express.Router();

const HotelsController = require('../controllers/Hotels');

module.exports = () => {
  const PATH = 'hotels';
  const hotelsController = new HotelsController();
  router.get('/search', hotelsController.search);

  return {
    PATH,
    router
  }
};