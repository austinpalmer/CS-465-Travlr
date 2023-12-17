const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

/*
    This file serves as a controller to request data from the API
    and then rendering the view based on the returned rooms data or error.
*/


// Render Rooms List
const renderRoomsList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = 'Rooms';
    // If response data isn't an array, throw error
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No rooms exist in database!';
        }
    }
    // Render page with trips
    res.render('rooms', 
        {
            title: pageTitle,
            rooms: responseBody,
            message
        }
    );
}

// GET Room List
const roomsList = (req, res) => {
    const path = '/api/rooms';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    // Log API call for debugging
    console.info('>> roomsController.roomsList calling ' + requestOptions.url);
    // Request data from API and call render method if data exists
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderRoomsList(req, res, body);
        }
    );
}

module.exports = {
    roomsList
};