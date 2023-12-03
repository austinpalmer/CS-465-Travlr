var express = require('express');
var router = express.Router();
const controller = require('../controllers/about');

// Get contact page
router.get('/', controller.contact);

module.exports = router;