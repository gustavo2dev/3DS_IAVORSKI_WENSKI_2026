const express = require('express');
const server = express();

//rotas
server.get('/', (req, res) => {
    res.status(200).send("Olá Express");
})

server.get('/sobre', (req, res) => {
    res.status(200).send({ "name": "Jebao" });
})

server.use((req, res) => {
    res.status(404).send("ERRROOOOOOOO!!!!");
})

//Servidor

server.listen(3000);
