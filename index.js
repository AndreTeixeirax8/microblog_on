const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const categoriesArticles = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const { where } = require("sequelize");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

connection
  .authenticate()
  .then(() => {
    console.log("conexão com banco feita com sucesso");
  })
  .catch((error) => {
    console.log("erro na conexao com o banco ", error);
  });

app.use("/", categoriesController);
app.use("/", categoriesArticles);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["createdAt", "DESC"]], // Ordena pelo campo de data de criação
  }).then((articles) => {
    res.render("index", { articles: articles }); // página inicial
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        res.render("article", { article: article });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
