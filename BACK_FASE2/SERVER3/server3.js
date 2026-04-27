const http = require('http');
let port = 3000;
let hooost = 'localhost';
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'text/html');

    // preparando o conteudo 
    fs.readFile('./html/pag1.html', (err, data) => {
        if (err) {
            console.log("Erro ao carregar a página")
            res.write("Sinto muito você tomou no peidante, não conseguimos carregar a página ");
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
})

fs.readFile('./html/pag2.html', (err, data) => {
        if (err) {
            console.log("Erro ao carregar a página")
            res.write("Sinto muito você tomou no peidante, não conseguimos carregar a página ");
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })

server.listen(port, host, () => {
    console.log("Servidor no ar!!");
})