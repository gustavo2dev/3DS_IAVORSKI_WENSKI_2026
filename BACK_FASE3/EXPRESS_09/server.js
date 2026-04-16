const express = require("express");
const app = express();
const funcoes = require("./functions");

app.listen(3000, () => {
  console.log(" Servidor no ar !!!");
});

app.get("/", (req, res) => {
  res.send("Teste com arquivos externos no servidor!!");
});

app.get("/add/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  const resultado = funcoes.add(a, b);

  res.send(`A soma de ${a} e ${b} é igual a ${resultado}`);
});
