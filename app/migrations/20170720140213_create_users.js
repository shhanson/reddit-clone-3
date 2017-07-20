exports.up = knex =>
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('userid', 16).notNullable().unique();
    table.string('hashed_password').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTable('users');
