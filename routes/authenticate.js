var express = require('express');
var router = express.Router();
var authenticateService = require('../services/authenticateService.js');
const errorHandler = require('../error');

module.exports = router;

router.post('/', function(req, res, next) {
    username = req.body.username;
    password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    // Oauth 
    authenticateService.authenticate(username, password)
        .then((result) => {
            if (result) {
                res.status(200).json({ message: 'Authentication successful', token: result.token, user: { id: result.id, username: result.username }});
            } else {
                res.status(401).send({ error: 'Invalid username or password' });
            }
        })
        .catch((error) => {
            errorHandler.display(error, req, res);
        });

});