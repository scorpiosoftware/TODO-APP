const db = require('../config/db');
const dbTables = require('../Models/dbTables');
const PasswordHash = require('../Services/PasswordHash');

class UserController {
    async index(req, res) {
        const inputs = req.body;
        const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer TOKEN"
        if (!token) return res.status(401).send('Access Denied');
        const records = await db(dbTables.users.table).select('*');
        if (records.length <= 0) {
            return res.code(404).send({ status: "NOT_FOUND", statusCode: 404, message: "Users NOT Found" });
        }
        return res.code(200).send({ status: "SUCCESS", statusCode: 200, message: "Users List Found", data: { records: records } });
    }
    async show(req, res) {
        const params = req.params;
        const record = await db(dbTables.users.table).select('*').where({ id: params.id }).first();
        if (!record) {
            return res.code(404).send({ status: "NOT_FOUND", statusCode: 404, message: "User NOT Found" });
        }
        return res.code(200).send({ status: "SUCCESS", statusCode: 200, message: "User Found", data: { record: record } });
    }
    async store(req, res) {
        const inputs = req.body;
        inputs.password = await PasswordHash.hash(inputs.password);
        const newRecord = await db(dbTables.users.table).insert(inputs).select('*');
        return res.code(200).send({ status: "SUCCESS", statusCode: 200, message: "User Successfuly Created", data: { record: newRecord } });
    }
    async update(req, res) {
        const inputs = req.body;
        const id = req.params.id;
        try {
            // 1. Check if the user exists
            const existingUser = await db(dbTables.users.table).select('*').where({ id: id }).first();
            if (!existingUser) {
                return res.status(404).send({
                    status: "Failed",
                    statusCode: 404,
                    message: "User not found"
                });
            }

            // 2. Prepare update data (exclude sensitive fields like `password` unless provided)
            const updateData = {
                full_name: inputs.full_name,
                user_name: inputs.user_name,
                email: inputs.email,
                role:inputs.role,
            };
            // 4. Execute the update
            const updatedCount = await db(dbTables.users.table).update(updateData)
                .where({ id: id }); // Adjust syntax for your ORM

            // 5. Check if the update succeeded
            if (updatedCount === 0) { // Some ORMs return the number of updated rows
                return res.status(404).send({
                    status: "Failed",
                    statusCode: 404,
                    message: "User update failed (no rows affected)"
                });
            }

            // 6. Fetch the updated record (some ORMs don't return it by default)
            const updatedRecord = await db(dbTables.users.table).select('*').where({ id: id }).first();;

            // 7. Return the response
            return res.status(200).send({
                status: "SUCCESS",
                statusCode: 200,
                message: "User updated successfully",
                data: { record: updatedRecord }
            });
        } catch (error) {
            console.error("Update error:", error);
            return res.status(500).send({
                status: "Failed",
                statusCode: 500,
                message: error.message || "Internal server error"
            });
        }
    }
    async destroy(req,res){
        const params = req.params;
        const record = await db(dbTables.users.table).select('*').where({ id: params.id }).first().del();
        if (!record) {
            return res.code(404).send({ status: "NOT_FOUND", statusCode: 404, message: "User Not Exist" });
        }
        return res.code(200).send({ status: "SUCCESS", statusCode: 200, message: "User Successfuly Deleted", data: { record: record } });
    }
}

module.exports = new UserController();