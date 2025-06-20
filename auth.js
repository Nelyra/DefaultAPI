const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    // Hash the password using bcrypt
    return bcrypt.hashSync(password, 10);
};

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        const verified = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using the secret key
        req.user = verified;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' }); // If token verification fails, send an unauthorized response
    }
};