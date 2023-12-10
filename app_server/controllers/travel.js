const fs = require('fs');
const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

/* Parse JSON data for trips (name, image, desc.)
 Note: Not best practice, will reload data everytime page is called. Change code to be in the startup later
 Currently used for rapid development */
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', "utf8"));
const roomsData = JSON.parse(fs.readFileSync('./data/roomsData.json', "utf8"));

// Render Travel List
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';
    // If response data isn't an array, throw error
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in database!';
        }
    }
    // Render page with trips
    res.render('travel', 
        {
            title: pageTitle,
            trips: responseBody,
            message
        }
    );
}

// GET Traveler List
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    // Log API call for debugging
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    // Request data from API and call render method if data exists
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
}

// Get Rooms view
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms', roomsData})
};

// Get Meals view
const meals = (req, res) => {
    res.render('meals', { title: 'Meals'})
};

// Get News view
const news = (req, res) => {
    res.render('news', { title: 'News'})
};


module.exports = {
    travelList,
    rooms,
    meals,
    news
};