let nome = "João";
console.log(nome);

function adicionar(a, b) {
  return a + b;
}

console.log(adicionar(10, 12));

//console.log(global);

setTimeout(() => {
  console.log("Operação comcluída com sucesso!!!");
}, 3000);

console.log(__dirname);
console.log(__filename);
