const http = require('http');
const fs = require('fs');

let port = 2000;
let host = 'localhost';

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    let html_page = '';
    switch (req.url) {
        case ('/'):
            html_page = 'home.html'
            res.statusCode = 200;
            break;
        case ('/home'):
            html_page = 'home.html'
            res.statusCode = 200;
            break;
        case ('/servicos'):
            html_page = 'servicos.html'
            res.statusCode = 200;
            break;
        case ('/equipamentos'):
            html_page = 'equipamentos.html'
            res.statusCode = 200;
            break;
        case ('contatos.html'):
            html_page = 'contatos.html'
            res.statusCode = 200;
            break;
        default:
            html_page = '404.html'
            res.statusCode = 404
            break;



    }

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
    console.log('Servidor: TAMO ONLINE!!!!')
})
