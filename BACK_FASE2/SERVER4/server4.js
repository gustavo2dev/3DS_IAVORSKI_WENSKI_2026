const http = require("http");
const fs = require("fs");

let port = 3000;
let host = "localHost";

const server = http.createServer((req, res) => {
  //header
  res.setHeader("content-type", "text/html");

  //roteamento
  let html_page = "";

  switch (req.url) {
    case "/":
      res.setHeader("location", "/");
      res.statusCode = 301;
      res.end();
      break;

    case "/home":
      html_page = "home.html";
      res.statusCode = 200;
      break;

    case "/sobre":
      html_page = "about.html";
      res.statusCode = 200;
      break;

    case "/servicos":
      html_page = "services.html";
      statusCode = 200;
      break;

    default:
      html_page = "404.html";
      res.statusCode = 404;
      break;
  }

  // preparar página html

  fs.readFile(`./HTML/` + html_page, (err, data) => {
    if (err) {
      console.log("erro");
      res.statusCode = 404;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, host, () => {
  console.log("Servidor está no ar!!!");
});
