const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

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

Category.hasMany(Article); //Uma Categoria tem muitos artigos
Article.belongsTo(Category); //Um artigo pertence a uma categoria
//quando ativo ele vai criar a tabela , após criar pode ser removido
//Article.sync({ force: true });

module.exports = Article;
