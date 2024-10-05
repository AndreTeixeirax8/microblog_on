const Sequelize = require("sequelize");
const connection = require("../database/database");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false, //nao permite o campo vazio
  },
  slug: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

module.exports = Article;
