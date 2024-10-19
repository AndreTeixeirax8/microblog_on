const Sequelize = require("sequelize");

const connection = new Sequelize("microblog", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
