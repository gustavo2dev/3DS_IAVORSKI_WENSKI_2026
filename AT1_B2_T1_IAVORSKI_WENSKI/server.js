const express = require("express");
const server = express();

server.listen(3000);

server.get("/", (req, res) => {
  res.sendFile("./VIEWS/home.html", { root: __dirname });
});

server.get("/iavorski", (req, res) => {
  res.sendFile("./VIEWS/iavorski.html", { root: __dirname });
});

server.get("/wenski", (req, res) => {
  res.sendFile("./VIEWS/wenski.html", { root: __dirname });
});

server.use((req, res) => {
  res.sendFile("./VIEWS/404.html", { root: __dirname });
  res.status(404);
});
