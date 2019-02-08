const winston = require('winston');

// winston needs more study.  We're using a different version of Winston 
// which seems to have more involved methods setting it up corretly.

// the setup appears to have changed.  Meta data is not coming out 
// they way I would expect.  Use docmentation.

module.exports = function(err, req, res, next) {
    // Log the error
    // 1) set the logging level:
        //  error
        //  warn
        //  info
        //  verbose
        //  debug
        //  silly
    //winston.log('error', err.message);
    winston.error(err.message, err);
    //winston.error(new Error('Error as info'));

    // Internal Server Error - something failed on the server
    // but we don't know what.
    res.status(500).send('Something failed.')
}