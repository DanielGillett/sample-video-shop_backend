const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

// WINSTON NEEDS TO BE RE-BUILT!

// NEWER VERSION CONFIGURATION IS DIFFERENT

// THESE ERRORS ARE NOT LOGGING

// ALSO, THE ERROR.JS MOD IS DUPLICATED AND 
//      SHOULD BE HERE IN ONE PLACE.  THEN, REFER TO
//      MOSH'S ERROR.JS FOR 'ONLY' THE ERROR INFO
//      WHICH WILL PASS TO WINSTON 'HERE'

module.exports = function() {
    // winston default, but good to know it's setup like this.
    winston.exitOnError = true;

    winston.handleExceptions(
        new winston.transports.File({ 
            level: 'info',
            filename: './logs/uncaughtExceptions.log',
            handleExceptions: true 
        }),
        new winston.transports.Console({
            colorize: true, 
            prettyPrint: true
        })
        );
        
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
    }
    // various examples:
    //https://github.com/winstonjs/winston#handling-uncaught-exceptions-with-winston