const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
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

}