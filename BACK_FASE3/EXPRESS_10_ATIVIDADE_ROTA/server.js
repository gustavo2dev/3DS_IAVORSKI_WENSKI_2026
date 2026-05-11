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

app.get("/setup", (req, res) => {
  //rota para inserção de dados na tabela
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";
  connection.run(query, ["Estudar rotas do Express", "concluído"]);
  connection.run(query, ["Configurar banco SQLite", "em andamento"]);
  connection.run(
    query,
    ["Testar a extensão SQLite Viewer", "pendente"],
    (err) => {
      if (err) {
        res.send("Erro ao popular dados");
      } else {
        res.send(
          "<h1>Ambiente configurado com sucesso</h1><p>Vá para a rota principal para ver os dados</p>",
        );
      }
    },
  );
});

app.get("/setupIavorski", (req, res) => {
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";
  connection.run(
    query,
    ["Tirar nota boa na prova de quinta-feira", "em andamento"],
    (err) => {
      if (err) {
        res.send("Erro ao popular dados");
      } else {
        res.send(
          "<h1>Ambiente configurado com sucesso </h1> <p>Vá para a rota localhost</p>",
        );
      }
    },
  );
});
