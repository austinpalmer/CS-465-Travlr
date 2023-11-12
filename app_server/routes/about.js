var express = require('express');
var router = express.Router();
const controller = require('../controllers/about');

// Get about
router.get('/', controller.about);

module.exports = router;