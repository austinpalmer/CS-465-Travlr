var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

// Get travel page
router.get('/', controller.travelList);

module.exports = router;