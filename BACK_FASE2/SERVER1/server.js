// criar servidor usando http

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Efetuando o pedido');
    res.write('Pedido Aceito');
    res.end();
})
server.listen(3000, 'localhost', () => {
    console.log('Servidor iniciado');
})