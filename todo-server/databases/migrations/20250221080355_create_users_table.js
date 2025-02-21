
const tables = require("../../app/Models/dbTables");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tables.users.table, function (table) {
        table.bigIncrements(tables.users.fields.id).primary();
        table.string(tables.users.fields.full_name).notNullable();
        table.string(tables.users.fields.user_name, 191).notNullable().unique();
        table.string(tables.users.fields.email, 191).notNullable().unique();
        table.string(tables.users.fields.password, 191).notNullable();
        table.enum(tables.users.fields.role.name, [tables.users.fields.role.admin, tables.users.fields.role.user]).defaultTo(tables.users.fields.role.user);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tables.users.table);
};
