/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employees', (table)=>{
    table.increments();
    table.string('name').notNullable();
    table.string('cpf').primary();
    table.string('email').notNullable();
    table.string('whatsApp').notNullable();
    table.string('Address').notNullable();x
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('employees')
  
};
