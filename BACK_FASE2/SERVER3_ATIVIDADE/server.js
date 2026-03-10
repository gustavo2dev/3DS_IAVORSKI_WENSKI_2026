const http = require("http");
const fs = require("fs");

let port = 3000;
let host = "localhost";

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");

  
  let caminho = "./html/";

  switch (req.url) {
    case "/pag1.html":
      caminho += "/pag1.html";
      res.statusCode = 200;
      break;
    case "/pag2.html":
      caminho += "/pag2.html"; 
      res.statusCode = 200;
      break;
  }

  fs.readFile(caminho, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Arquivo nao encontrado!");
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});