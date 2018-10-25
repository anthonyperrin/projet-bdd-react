const jwt = require('jsonwebtoken');
const configSecret = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({auth: false, message: 'No token provided.'});
    jwt.verify(token,
    configSecret.secret, (err, result) => {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate the token.'});
        req.userId = result.id;
        next();
    });
}
module.exports = verifyToken;