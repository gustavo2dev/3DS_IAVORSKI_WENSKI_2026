const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Servidor no ar");
});

app.get("/", (req, res) => {
  res.send("Teste com parâmetros");
});

app.get("/distancia/:pontoA-:pontoB", (req, res) => {
  const pontoA = req.params.pontoA;
  const pontoB = req.params.pontoB;
  const distancia = pontoA - pontoB;
  res.send(`A distância entre ${pontoA} e ${pontoB}, é de ${distancia}`);
});

app.get("/distancia/:pontoA.:pontoB", (req, res) => {
  const pontoA = req.params.pontoA;
  const pontoB = req.params.pontoB;
  const distancia = pontoA - pontoB;
  res.send(`A distância entre ${pontoA} e ${pontoB}, é de ${distancia}`);
});

app.get("/produto/:pA/:pB", (req, res) => {
  const pA = req.params.pA;
  const pB = req.params.pB;
  const produto = productA * productB;
  res.send(`A multiplicação de entre ${pA} e ${pB}, é de ${produto}`);
});
