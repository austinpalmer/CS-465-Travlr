const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

/* 
    Bring in passport library w/ local strategy. This allows for the use
    of multiple types of sign in. Specifically email for this application.
*/
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (username, password, done) => {
        // Attempt to find user in DB. 
        User.findOne({ email: username}, (err, user) => {
            if (err) {
                return done(err);
            } 
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username"   // no matching username
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password"   // password doesn't match
                });
            }
            return done(null, user);    // return user if successful
        });
    }
));