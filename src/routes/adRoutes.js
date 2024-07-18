const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.get('/popular', adController.getPopularAds);

module.exports = router;