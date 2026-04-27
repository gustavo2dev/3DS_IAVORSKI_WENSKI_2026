// criar uma coleção

let nomes = ['João', 'Ana', 'Carlos'];
let frutas = ['laranja', 'banana', 'abacaxi'];

function soma(a, b){
    return a+b
}

// criar exportação

// module.exports =nomes;
// module.exports = frutas;

module.exports={
    nomes,
    frutas,
    soma
}