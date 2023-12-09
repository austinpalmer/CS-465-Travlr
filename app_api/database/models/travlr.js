const mongoose = require('mongoose');

// define the trip schema
const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    length: {type: String, required: true},
    start: {type: Date, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}
});

// define the rooms schema
/*const roomSchema = new mongoose.Schema({
    room: {type: String, required: true, index: true},
    image: {type: String, required: true}, 
    description: {type: String, required: true},
    rate: {type: String, required: true}
});*/

module.exports = mongoose.model("trips", tripSchema, 'trips');
//module.exports = mongoose.model("roomsData", roomSchema);