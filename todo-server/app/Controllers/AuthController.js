const db = require('../config/db');
const dbTables = require('../Models/dbTables');
const PasswordHash = require('../Services/PasswordHash');
const jwt = require('jsonwebtoken');
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const existAuth = await db(dbTables.users.table).where({ email: email }).first();
        if (!existAuth)
            return res.code(404).send({ status: "NOT FOUND", statusCode: 404, message: "Credentials are not on our records" });
        const compair = await PasswordHash.compare(password, existAuth.password);
        if (!compair)
            return res.code(404).send({ status: "INCORRECT_PASSWORD", statusCode: 401, message: "Incorrect Password" });

        const token = jwt.sign(existAuth.emai, process.env.JWT_TOKEN_SECRET, { expiresIn: '2h' });

        return res.code(200).send({ status: "Authorized", statusCode: 200, message: "Authentication Succeed", token: token , data: existAuth });
    }
}

module.exports = new AuthController;