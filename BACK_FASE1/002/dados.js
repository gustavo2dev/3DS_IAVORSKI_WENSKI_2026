//criar uma coleção

let nomes = ["joão", "ana", "carlos"];
let frutas = ["laranja", "banana", "abacaxi"];

function soma(a, b) {
  return a + b;
}

//criar a exportação
//module.exports = nomes;
//module.exports = frutas;

module.exports = {
  nomes,
  frutas,
  soma,
};
