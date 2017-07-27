
exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.string('image_url').notNullable();
    table.integer('vote_count').defaultTo(0).notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
