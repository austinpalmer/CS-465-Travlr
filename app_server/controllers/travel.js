const fs = require('fs');
/* Parse JSON data for trips (name, image, desc.)
 Note: Not best practice, will reload data everytime page is called. Change code to be in the startup later
 Currently used for rapid development */
const trips = JSON.parse(fs.readFileSync('./data/trips.json', "utf8"));


// Get Traveler view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips});
};

module.exports = {
    travel
};