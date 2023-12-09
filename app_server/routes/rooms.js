const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

// Get rooms page
router.get('/', controller.rooms);

module.exports = router;