const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const readTheaters = movie_id => {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .where({ "movies_theaters.movie_id": movie_id })
    .select("theaters.*", "movies_theaters.is_showing");
};

const readReviews = movie_id => {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("critics.*", "reviews.*")
    .where({ "reviews.movie_id": movie_id })
    .then(reviews => reviews.map(review => critic(review)))
};

const read = movie_id => {
  return knex("movies").select("*").where({ movie_id }).first();
};

const list = () => {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .distinct("movies.*")
    .where({ "movies_theaters.is_showing": true })
};

const critic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

module.exports = {
  readTheaters,
  readReviews,
  read,
  list,
};
