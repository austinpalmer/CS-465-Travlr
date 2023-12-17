const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

// Get travel page
router
    .route('/')
    .get(controller.travelList);

module.exports = router;