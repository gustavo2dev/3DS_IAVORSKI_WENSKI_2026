const express = require('express');
const server = express();

server.listen(3000);

server.get('/', (req, res) => {
    res.sendFile('./Views/home.html', { root: __dirname });
})

server.get('/servicos', (req, res) => {
    res.sendFile('./Views/servicos.html', { root: __dirname });
})

server.get('/sobre', (req, res) => {
    res.sendFile('./Views/about.html', { root: __dirname });
})

server.get('/acerca_de', (req, res) => {
    res.redirect('/about');
})

server.use((req, res) => {
    res.status(404).sendFile('./Views/404.html', { root: __dirname });
})