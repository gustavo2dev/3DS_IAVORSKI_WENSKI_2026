const { clear } = require('console');
const fs = require('fs');

// criar mensagem de log
let log = "Você foi rastreado, aguarde o contato da polícia.\n";

// fs.writeFileSync('./logs.log',log,{flag:'a+'})

// fs.writeFile('./logs.log',log,{flag:'a+'},(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

fs.unlinkSync('./logs.log')
console.log(log);
