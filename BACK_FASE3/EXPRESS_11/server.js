const express = require('express');
const mysql = require('mysql2');
const app = express();

app.listen(3000, () => {
    console.log("Servidor no ar!!!");
});

//Criar a conexão com banco de dados;
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'user_bd_tasks',
    password: 'QL0P4TDcQGB2R97Djet7vXYHggstTZE4',
    database: 'nodejs_tasks'
});

conection.connect(error => {

    //(error) é a variavel que retorna se ocorreu a conexão com MYSQL;

    if (error) {
        console.log("Erro na conexão com MYSQL: " + error.message);
        return;
    }
    else {
        console.log('conexão bem sucedida!!!');
    }
});

//Rotas com o banco de dados;

app.get('/', (req, res) => {

    //(query) consuta ao banco de dados;

    conection.query('SELECT * FROM tasks', (err, results, fields) => {

        //(err) variavel local para achar lista no BD;

        if (err) {
            console.log(err.message);
            res.send('Erro ao Obter a lista de tarefas')
        }
        else {
            res.send(results)
        }
    });
});
