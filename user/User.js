const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false, //nao permite o campo vazio
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false, //nao permite o campo vazio
  },
});

//quando ativo ele vai criar a tabela , após criar pode ser removido
//User.sync({ force: false });

module.exports = User;
