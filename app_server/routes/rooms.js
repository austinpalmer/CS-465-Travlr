var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

// Get rooms
router.get('/', controller.rooms);

module.exports = router;