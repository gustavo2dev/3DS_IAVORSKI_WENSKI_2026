const fs = require("fs");

//criar uma mensagem  de log

let log = "Você foi rastredo, aguarde contato da polícia.\n";

// fs.writeFileSync("./logs.log", log, { flag: "a+" });

// fs.writeFile("./logs.log", log, { flag: "a+" }, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

fs.unlinkSync("./logs.log");

// console.log(log);
