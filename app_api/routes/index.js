const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
// Configure JWT to restrict routes to non-authorized users
const auth = jwt({
    secret: process.env.JWT_SECRET,
    // User is coming in through token called payload
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
const roomsController = require('../controllers/rooms');


/*
    This file serves as the main router for all API routes.
    CRUD operations are performed and use the appropriate controller
    to edit data in the DB. Authorization is handled for each route
*/

// Log user in
router
    .route('/login')
    .post(authController.login);

// Register new user
router
    .route('/register')
    .post(authController.register);

// Get all trips
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// Get specific trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

// Get all rooms
router
    .route('/rooms')
    .get(roomsController.roomsList);

module.exports = router;