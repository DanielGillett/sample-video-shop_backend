const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No Token provided.');

    try {
        // const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // req.user = decoded;
        // next();
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token.');
    }
}

// module.exports = auth;