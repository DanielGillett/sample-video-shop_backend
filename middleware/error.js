const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const logDir = 'logs';
if(!fs.existsSync(logDir)) fs.mkdirSync(logDir);
const filename = path.join(logDir, 'winston.log');

// error, warn, info, verbose, debug, silly
const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    transports: [
        new transports.File({
            filename,
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(
                    info => `${info.timestamp} [Level]: ${info.level} [Message]: ${info.message}`
                )
            )
        }),
        new transports.MongoDB({
            db: 'mongodb://localhost/vidly-app'
        })
    ]
});

if(env !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.colorize(),
            format.printf(
                info => `${info.timestamp} [Level]: ${info.level} [Message]: ${info.message}`
            )
        )
    }));
}
     
module.exports = (err, req, res, next) => {
      logger.error(err.message);
      res.status(500).send('Somethings went wrong!');
    };