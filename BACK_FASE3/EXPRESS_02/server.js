const express = require("express");
const server = express();

server.listen(3000);

server.get("/", (req, res) => {
  res.sendFile("./VIEWS/home.html", { root: __dirname });
});

server.get("/sevicos", (req, res) => {
  res.sendFile("./VIEWS/services.html", { root: __dirname });
});

server.get("/sobre", (req, res) => {
  res.sendFile("./VIEWS/about.html", { root: __dirname });
});

server.use((req, res) => {
  res.sendFile("./VIEWS/404.html", { root: __dirname });
  res.status(404);
});
