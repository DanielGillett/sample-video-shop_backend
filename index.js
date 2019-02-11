


// moved these two so we only have to reference it once
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routs')(app);
require('./startup/db')();
require('./startup/config')();



// Set or Export a port in terminal...
// BASH terminal ► export PORT=5000
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));