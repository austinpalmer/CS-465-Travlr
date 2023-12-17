const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

/*
    This file serves as a controller to request data from the API
    and then rendering the view based on the returned trips data or error.
*/

// Render Travel List
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = 'Travel';
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
    meals,
    news
};