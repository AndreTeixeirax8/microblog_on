const Sequelize = require("sequelize");

const connection = new Sequelize("microblog", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
