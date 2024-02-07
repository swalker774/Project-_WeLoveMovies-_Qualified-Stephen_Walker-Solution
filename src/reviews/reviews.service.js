const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const read = (review_id) => {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.*", "critics.*")
    .where({ review_id })
    .first()
    .then(critic);
};

const update = (updatedReview) => {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
};

const destroy = (review_id) => {
  return knex("reviews").where({ review_id }).del();
};

const critic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});

module.exports = {
  read,
  update,
  delete: destroy,
};
