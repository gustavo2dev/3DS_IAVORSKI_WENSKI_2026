const http = require("http");
let port = 3000;
let host = "localhost";
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");

  //preparar o conteúdo html
  fs.readFile("./html/pg1.html", (err, data) => {
    if (err) {
      console.log("Erro ao carregar a página !!!!");
      res.write("Sinto muito não conseguimos carregar a página!!");
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, host, () => {
  console.log("Servido de pé!!!!!");
});
