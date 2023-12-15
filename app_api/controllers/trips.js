const mongoose = require('mongoose');

const Trip = mongoose.model('trips');
const User = mongoose.model('users');

/*
    This file serves as a controller for the API to return and manipulate
    trip listings in the DB. Communicates with the Angular SPA to allow
    the admin page to edit listings.
*/

// Callback to return all trips
const tripsList = async (req, res) => {
    Trip
        .find({}) // no filter to pull all trips
        .exec((err, trips) => {
            // Handle and display error if no trips or if there is an error getting data
            if (!trips) {
                return res
                    .status(404)
                    .json({ 'message': 'trips not found' });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            // Send tripData to client for rendering
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
}

// Callback to add a new trip
const tripsAddTrip = async(req, res) => {
    // Check if user has authorization
    getUser(req, res, 
        (req, res) => {
    // Call mongoose create method to POST data to backend from SPA
        Trip
        .create({             
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        (err, trip) => {
            if (err) {
                return res
                    .status(400)
                    .json(err);
            } else {
                return res
                    .status(201)
                    .json(trip);
            }
        });
    })
}

// Callback to edit a trip
const tripsUpdateTrip = async (req, res) => {
    // Check if user has authorization
    getUser(req, res, 
        (req, res) => {
        console.log(req.body);
        Trip
            .findOneAndUpdate({ 'code': req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description      
            }, {new: true})
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code ' + req.params.tripCode
                        });
                }
                res.send(trip);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code ' + req.params.tripCode  
                        });
                }
                return res
                    .status(500) // server error
                    .json(err); 
            });
    })
}

// Callback to delete specific trip
const tripsDeleteTrip = async(req, res) => {
    // Check if user has authorization
    getUser(req, res, 
        (req, res) => {
        console.log(req.body);
        Trip
        .findOneAndDelete({ 'code': req.params.tripCode })
        .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code ' + req.params.tripCode
                        });
                }
            // Send deleted trip as a response
            res.send(trip);
        }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code ' + req.params.tripCode  
                        });
                }
                return res
                    .status(500) // server error
                    .json(err); 
        }); 
    })
}

// Callback to return specific trip
const tripsFindCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            // Handle and display error if no trips or if there is an error getting data
            if (!trip) {
                return res
                    .status(404)
                    .json({ 'message': 'trip not found' });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            // Send tripData to client for rendering
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// 
const getUser = (req, res, callback) => {
    // Verify there is a payload and email with the payload
    if (req.payload && req.payload.email) {
        // Find user by email
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ 'message': 'User not found' });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({ 'message': 'User not found' })
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
