const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false, //nao permite o campo vazio
  },
  slug: {
    type: Sequelize.STRING,
  },
});

//quando ativo ele vai criar a tabela , após criar pode ser removido
//Category.sync({ force: true });

module.exports = Category;
