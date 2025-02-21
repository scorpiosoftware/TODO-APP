const knex = require('knex');
const db = knex({
    client: 'mysql2',  // Change to 'pg' for PostgreSQL, 'sqlite3' for SQLite
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS  || '',
        database: process.env.DBNAME   || 'todo_db'
    },
    migrations: {
        tableName: process.env.TABLE_NAME || 'migrations',
      },
});

module.exports = db;
