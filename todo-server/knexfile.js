// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.DB_CLIENT || 'mysql2',  // Change to 'pg' for PostgreSQL, 'sqlite3' for SQLite
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS  || '',
        database: process.env.DBNAME   || 'todo_db'
    },
    useNullAsDefault: true,
    migrations:{
      tableName: process.env.TABLE_NAME || 'migrations',
      directory : './databases/migrations',
    },
    seeds : {
       directory : "./databases/seeds"
    }
  },
};
