const Fastify = require('fastify');
const routes = require('./routes/api');
// const crypt = require('crypto');
require('dotenv').config();
const app = Fastify({
    ignoreTrailingSlash: true,
    logger: true
});
app.register(routes);
const start = async () => {
    try {
        await app.listen({ port: process.env.APP_PORT });
        console.log(`Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();


