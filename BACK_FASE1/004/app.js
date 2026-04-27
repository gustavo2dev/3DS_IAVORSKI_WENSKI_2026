const fs = require('fs');

// criar pasta sícrona
// fs.mkdirSync('logs');

// criar de forma assícrona
// fs.mkdir('logs2',(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

if(fs.existsSync('./logs')){
    fs.rmdirSync('./logs');
}

console.log("fim");