const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define schema for user
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    hash: String,
    salt: String
});

// Set password using a salt and password to make a hash based on PBKDF2 standards
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

// Compare the stored password with the decrypted password
userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

// Generate a JWT token for the browser to store
userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    // Set expiration 7 days from creation
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        // convert to milliseconds
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, process.env.JWT_SECRET); // Separates the secret from code for security
};

mongoose.model('users', userSchema);

