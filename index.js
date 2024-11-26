const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const categoriesArticles = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const { where } = require("sequelize");
const usersController = require("./user/UsersController");
const User = require("./user/User");
const session = require("express-session");
const multer = require("multer"); // Importa o multer
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "upload");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "palavra-secreta",
    //Esse valor equivale a 3 dias fonte site
    //https://www.alltheunits.com/pt/tempo/milissegundos/dias/?value=300000000
    cookie: { maxAge: 300000000 },
  })
);

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
app.use("/", usersController);

// Configuração do Multer para salvar os arquivos na pasta 'upload'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "upload")); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Define o nome do arquivo
  },
});
const upload = multer({ storage: storage });

// Rota para upload de imagem
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }
  res.send(`Arquivo ${req.file.filename} enviado com sucesso!`);
});

app.get("/", (req, res) => {
  Article.findAll({
    order: [["createdAt", "DESC"]], // Ordena pelo campo de data de criação
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories }); // página inicial
    });
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
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories }); // página inicial
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
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
