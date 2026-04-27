const express = require('express');
const server = express();

server.listen(3000);

//Rotas
/*
home
services
about
404
*/

server.get('/', (req, res) => {
    res.sendFile('./Views/home.html', { root: __dirname });
})

server.get('/serviços', (req, res) => {
    res.sendFile('./Views/services.html', { root: __dirname });
})

server.get('/sobre', (req, res) => {
    res.sendFile('./Views/about.html', { root: __dirname });
})

server.use((req, res) => {
    res.statusCode(404).sendFile('./Views/404.html', { root: __dirname });
})