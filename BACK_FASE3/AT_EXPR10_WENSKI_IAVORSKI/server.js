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

app.get("/insere-poucos", (req, res) => {
  //rota para inserção de dados na tabela
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";
  connection.run(query, ["Estudar rotas do Express", "concluído"]);
  connection.run(query, ["Configurar banco SQLite", "em andamento"]);
  connection.run(query, ["Testar a extensão SQLite Viewer", "pendente"]);
  connection.run(query, ["Estudar para prova", "concluído"]);
  connection.run(
    query,
    ["Estudar para recuperação", "pendente"],

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

app.get("/insere-muitos", (req, res) => {
  // Dados que vão ser adicionados
  const novasTarefas = [
    ["Ler documentação do SQLite", "concluído"],
    ["Praticar Middlewares no Express", "em andamento"],
    ["Configurar variáveis de ambiente", "pendente"],
    ["Criar projeto de To-Do List", "em andamento"],
    ["Revisar sintaxe de Callbacks", "concluído"],
    ["Instalar Insomnia ou Postman", "concluído"],
  ];

  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";

  // leitura do array
  connection.serialize(() => {
    // leitura linha por linha
    novasTarefas.forEach((tarefa, index) => {
      // resposta quando chegar no ultimo item do array
      if (index === novasTarefas.length - 1) {
        connection.run(query, tarefa, (err) => {
          if (err) {
            res.send("Erro ao popular muitos dados");
          } else {
            res.send(
              `<h1>Sucesso!</h1><p>${novasTarefas.length} novas tarefas foram inseridas.</p>`,
            );
          }
        });
      } else {
        connection.run(query, tarefa);
      }
    });
  });
});
