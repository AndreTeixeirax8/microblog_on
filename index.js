const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const categoriesArticles = require("./articles/ArticlesController");

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
  res.render("index"); //pagina inicial
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
