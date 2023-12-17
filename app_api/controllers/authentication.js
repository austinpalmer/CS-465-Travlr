const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

/*
    This file serves as the controller for the API to register or
    sign into an existing user account by communicating with the DB.
*/

// Register a new user to the DB
const register = (req, res) => {
    // If any field is left empty
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ 'message': 'All fields required' });
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    // Encode and encrypt using mongoose schema 'users'
    user.setPassword(req.body.password);
    user.save((err) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            // generate a JWT token for new user
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        }
    })
};

// Log the user in
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ 'message': 'All fields required' });
    }
    passport.authenticate('local', (err, user, info) => {
        // If error with authentication, exit immediately
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        // Otherwise, check the user and generate token if valid
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        // If authentication fails (wrong user or password)
        } else {
            res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};