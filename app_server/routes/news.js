const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

// Get news page
router.get('/', controller.news);

module.exports = router;