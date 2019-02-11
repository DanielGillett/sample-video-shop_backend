require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
// moved these two so we only have to reference it once
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();

require('./startup/routs')(app);
require('./startup/db')();

// winston default, but good to know it's setup like this.
winston.exitOnError = true;

// various examples:
//https://github.com/winstonjs/winston#handling-uncaught-exceptions-with-winston
winston.handleExceptions(new winston.transports.File({ 
    level: 'info',
    filename: './logs/uncaughtExceptions.log',
    handleExceptions: true }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ 
    filename: './logs/uncaughtExceptions.log',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
            info => `${info.timestamp} [Level]: ${info.level} [Message]: ${info.message}`
        )
    )
}));

winston.add(new winston.transports.MongoDB({ 
    db: 'mongodb://localhost/vidly-app',
    level: 'info' }));

// throw new Error('something crazy just happend and we dont know what!');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1); // anything but 0 (zero) is a fatal error
}





// Set or Export a port in terminal...
// BASH terminal ► export PORT=5000
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));