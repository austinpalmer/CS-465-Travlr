// Room data
const fs = require('fs');
const roomData = JSON.parse(fs.readFileSync('./data/roomData.json', "utf8"));

// Get Rooms view
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms', roomData});
};

module.exports = {
    rooms
};
