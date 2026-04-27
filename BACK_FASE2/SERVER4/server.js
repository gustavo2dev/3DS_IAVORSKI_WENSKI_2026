const http = require('http');
const fs = require('fs');
let port = 3000;
let host = 'localhost';

const server = http.createServer((req, res) => {
    // header
    res.setHeader('Content-Type', 'text/html');

    // roteamento 
    let html_page = '';
    switch (req.url) {
        case '/':
            html_page = 'home.html'
            res.statusCode = 200;
            break;
        case '/home':
            res.setHeader('Location', '/')
            res.statusCode = 301;
            break;
        case '/sobre':
            html_page = 'about.html'
            res.statusCode = 200;
            break;
        case '/servicos':
            html_page = 'services.html'
            res.statusCode = 200;
            break;
        default:
            html_page = '404.html'
            res.statusCode = 404
            break;
    }

    // prepara a página de html
    fs.readFile('./html/' + html_page, (err, data) => {
        if (err) {
            console.log('Erro');
            res.statusCode = 404
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
})

server.listen(port, host, () => {
    console.log('Servidor está no ar!!!');
})