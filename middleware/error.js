
module.exports = function(err, req, res, next){
    // log the exception
    // Internal Server Error - something failed on the server
    // but we don't know what.
    res.status(500).send('Something failed.')
}