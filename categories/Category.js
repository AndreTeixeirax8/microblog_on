const Sequelize = require("sequelize");
const connection = require("../database/database");

const Cattegory = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false, //nao permite o campo vazio
  },
  slug: {
    type: Sequelize.STRING,
  },
});

module.exports = Category;
