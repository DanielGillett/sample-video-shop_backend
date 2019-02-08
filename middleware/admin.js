module.exports = function(req, res, next) {
    // 401 Unauthorized → Invalid, so we give them a chance
    // 403 Forbidden → Authorized, but forbidden (Access denied.)
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}