/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('breaks', table => {
      table.increments('id');
      table.string('deviceId', 36).notNullable().index();
      table.enum('type', ['34hour', '10hour']).notNullable();
      table.datetime('startTime').notNullable();
      table.datetime('endTime').notNullable();
      table.timestamps(true, true);
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("breaks");
};
