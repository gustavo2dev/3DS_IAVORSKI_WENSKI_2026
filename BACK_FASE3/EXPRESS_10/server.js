const express = require('express');
//const mysql = require('mysql2');
const slqlite3 = require('sqlite3').verbose();

const app = express();

app.listen(3000, () =>{
    console.log("Servidor SQLite Subiu!");
});

//criar a conexão (antiga)
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'user_bd_tasks',
//     password:'QL0P4TDcQGB2R97Djet7vXYHggatTZE4',
//     database:'nodejs_tasks'
// });


// NOVO SQlite!! 

    const connection = new slqlite3.Database('./database.db', (error) =>{
        if(error){
            console.log("Erro na conexão ao SQLite: " + error.message);
        }
        console.log('Conexão com SQLite (arquivo local) com sucesso!');
    });

// PREPARAÇÃO DO AMBIENTE

connection.serialize(() => {
    connection.run(
        'CREATE TABLE IF NOT EXISTS tasks (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'task TEXT, ' +
        'status TEXT)'
    );
});

// connection.connect(error =>{
//     if(error){
//         console.log("Erro na conexão com MySQL: "+ error.message);
//         return;
//     }
//     console.log("Connectado ao MySQL com Sucesso!");
// });

app.get('/', (req, res) =>{

    // connection.query('SELECT * FROM tasks', (err, results, fields) =>{
    //     if(err){
    //         console.log(err.message);
    //         res.send('Erro ao obter a lista de tarefas');
    //     }else{
    //         res.send(results);
    //     }

    // });

    //NOVO (SQLite) -método query vira all, e o resultado cira rows

    connection.all('SELECT * TABLE tasks', (err, rows)=>{
        if(err){
            console.log(err.message);
            res.send('Erro ao obter a lista de tarefas');
        }else{
            res.send(rows);
        }
    });
});
