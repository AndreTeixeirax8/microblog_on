const express = require("express");
const app = express();

app.length("/", (req, res) => {
  res.send("olá mundo");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
