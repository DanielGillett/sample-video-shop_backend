const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        //console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        //process.exit(1); // anything but 0 (zero) is a fatal error
        
        // Let the error handling manage this
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}