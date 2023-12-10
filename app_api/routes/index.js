const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Get all trips
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// Get specific trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode);

module.exports = router;