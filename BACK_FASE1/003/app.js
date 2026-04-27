const fs = require('fs');
 
fs.readFile('./dados.csv',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data.toString());
    }
})

// let dados = '';
// if(fs.existsSync('./dados.csv')){
//     dados = fs.readFileSync('./dados.csv');
//     console.log(dados.toString());
// }
// else{
//     console.log('Pasta não encontrada');
// }

console.log("Fim");