const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms');

// Get rooms page
router
    .route('/')
    .get(controller.roomsList);

module.exports = router;