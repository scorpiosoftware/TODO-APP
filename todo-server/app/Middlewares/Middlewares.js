const jwt = require('jsonwebtoken');

class Middlewares {
    authenticate(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer TOKEN"
            if (!token) return res.status(401).send('Access Denied');
        } catch (error) {

        }
    }
}

module.exports =  Middlewares;