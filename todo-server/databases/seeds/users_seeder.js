const dbTables = require("../../app/Models/dbTables");
const PasswordHasher = require('../../app/Services/PasswordHash'); // adjust the path as needed
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(dbTables.users.table).del()
  await knex(dbTables.users.table).insert([
    { full_name : 'Admin' , user_name : 'admin' ,email:'admin@admin.com',password:`${await PasswordHasher.hash('12345678',10)}`},
  ]);
};
