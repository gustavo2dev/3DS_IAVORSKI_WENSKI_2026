const http = require('http');
let port = 3000;
let host = 'localhost';

const server = http.createServer((req, res) => {
    // header
    res.setHeader('Content-Type', 'text/html');

    res.write('<h1>Pedido aceito<h1>');
    res.write('<h2>Pedido aceito<h2>');
    res.write('<h3>Pedido aceito<h3>');
    res.end();
})

server.listen(port, host, () => {
    console.log('Servidor Iniciado');
})