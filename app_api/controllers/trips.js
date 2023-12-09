const mongoose = require('mongoose');
const model = mongoose.model('trips');

// Callback to return all trips
const tripsList = async (req, res) => {
    model
        .find({}) // no filter to pull all trips
        .exec((err, trips) => {
            // Handle and display error if no trips or if there is an error getting data
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
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
};

// Call back to return specific trip
const tripsFindCode = async (req, res) => {
    model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            // Handle and display error if no trips or if there is an error getting data
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
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

module.exports = {
    tripsList,
    tripsFindCode
};
