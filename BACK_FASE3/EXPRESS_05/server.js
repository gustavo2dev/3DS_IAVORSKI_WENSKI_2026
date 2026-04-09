const express = require("express");
server = express();
var morgan = require("morgan");

server.listen(3000);

//MORGAN É UMA BIBLIOTECA PARA MIDDLEWARE

server.use(morgan("Status = :status | Método = :method | Url = :url"));

//

server.get("/", (req, res) => {
  res.send("Teste!!!!");
});
