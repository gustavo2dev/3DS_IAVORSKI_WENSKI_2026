const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.listen(3000, () => {
  console.log("Servidor SQLite Subiu!");
});

const connection = new sqlite3.Database("./database.db", (error) => {
  if (error) {
    console.log("Erro na conexão ao SQLite: " + error.message);
  }
  console.log("Conexão com SQLite (arquivo local) com sucesso!");
});

connection.serialize(() => {
  connection.run(
    "CREATE TABLE IF NOT EXISTS tasks (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "task TEXT, " +
      "status TEXT)",
  );
});

app.get("/", (req, res) => {
  connection.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.send("Erro ao obter tarefas");
      console.error("ERRO NO BANCO !!!!!! \n", err.message);
    } else {
      res.send(rows);
    }
  });
});

//          Rota de Inserção via URL
// Exemplo: localhost:3000/add/capinarLote/emAberto
app.get("/add/:t/:s", (req, res) => {
  const tarefa = req.params.t;
  const situacao = req.params.s;

  connection.run(
    "INSERT INTO tasks (task, status) VALUES (?, ?)",
    [tarefa, situacao],
    function (err) {
      if (err) {
        res.send("Erro ao inserir: " + err.message);
      } else {
        res.send(`Adicionado! Volte em localhost:3000 para ver.`);
      }
    },
  );
});
