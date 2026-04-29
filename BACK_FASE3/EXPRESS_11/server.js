const express = require('express');
//const mysql = require('mysql2');
const mysql_config = require('./mysql_config');

const app = express();

app.listen(3000, () =>{
    console.log("Servidor Subiu!");
});
