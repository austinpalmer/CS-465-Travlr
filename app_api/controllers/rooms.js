const mongoose = require('mongoose');
const model = mongoose.model('rooms');

/*
    This file serves as a controller for the API to return and manipulate
    room listings in the DB.
*/

// Callback to return all rooms
const roomsList = async (req, res) => {
    model
        .find({})   // pull all rooms
        .exec((err, rooms) => {
            if (!rooms) {
                return res
                    .status(404)
                    .json({'message': "No rooms found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(rooms);
            }
        });
} 

module.exports = {
    roomsList,
};