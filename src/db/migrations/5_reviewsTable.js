exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table
      .integer("critic_id")
      .unsigned()
      .references("critic_id")
      .inTable("critics");
    table
      .integer("movie_id")
      .unsigned()
      .references("movie_id")
      .inTable("movies");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
