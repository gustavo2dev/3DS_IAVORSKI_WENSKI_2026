const express = require('express');
const morgan = require('morgan');
const server = express();
server.listen(3000);

server.use(morgan('Método=:method | Status=:status | Url=:url'))

server.get('/', (req, res) => {
    res.send('Teste');
})