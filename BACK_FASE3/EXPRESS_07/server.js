const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Servidor no ar!!!!");
});

app.get("/", (req, res) => {
  res.send("Teste com parâmetros!!!");
});

app.get("/distancia/:pontoA.:pontoB", (req, res) => {
  const pontoA = req.params.pontoA;
  const pontoB = req.params.pontoB;

  const distancia = pontoB - pontoA;
  res.send(`A distância entre ${pontoA} e ${pontoB} é ${distancia}`);
});

app.get("/produto/:num1-:num2", (req, res) => {
  const num1 = req.params.num1;
  const num2 = req.params.num2;
  const produto = num1 * num2;

  res.send(`O produto de ${num1} e de ${num2} resulta em ${produto}`);
});
