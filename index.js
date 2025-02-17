const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routs')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.port || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
//app.listen(port, () => console.log(`Listening on port ${port}`));