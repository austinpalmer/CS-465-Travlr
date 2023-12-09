const mongoose = require('mongoose');
const host = process.env.DB_HOST || 'localhost:27017';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// avoid current server discovery and monitoring engine is deprecated
mongoose.set('useUnifiedTopology', true);
// Connect to DB
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }), 1000);
    
}

// Connection callback/success message
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to: ${dbURI}`);
});
// Disconnected callback/message
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
// Error callback/message
mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
});

// Listen for SIGINT (system-level signal) for windows
if (process.platform == 'win32') {
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on(`SIGINT`, () => {
        process.emit("SIGINT");
    });
}

// Close DB connection
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
}

// Handle shutdown callbacks depending on termination type
// Nodemon restart
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// App termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

connect();

// bring in mongoose schema
require("./models/travlr.js");