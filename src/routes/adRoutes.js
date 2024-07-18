const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.get('/search', adController.searchAds);

module.exports = router;