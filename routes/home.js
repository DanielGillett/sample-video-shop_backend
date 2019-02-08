const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Vidly World!!!');
});

module.exports = router;