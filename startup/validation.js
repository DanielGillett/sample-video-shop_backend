const Joi = require('joi');

module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}

// moved the Joi reference to startup mod 
// so we only have to reference it once