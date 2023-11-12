const fs = require('fs');
// Parse JSON data for trips (name, image, desc.)
// Note: Not best practice, will reload data everytime page is called. Change code to be in the startup later
const trips = JSON.parse(fs.readFileSync('./data/trips.json', "utf8"));


/* Get traveler view */
const travel = (req, res) => {
    // pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('travel', { title: 'Travlr Getaways', trips});
};

module.exports = {
    travel
};