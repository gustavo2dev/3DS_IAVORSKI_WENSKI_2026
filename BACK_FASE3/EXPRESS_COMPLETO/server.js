const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const morgan = require("morgan");
const path = require("path");
const functions = require("./functions");

const app = express();
const PORT = 3000;

// ==================== MIDDLEWARES ====================

// Morgan para logging customizado - mostra método, status, URL e tempo de resposta
app.use(
  morgan(
    "Método=:method | Status=:status | URL=:url | Tempo=:response-time ms",
  ),
);

// Middleware customizado - log no console para cada requisição
app.use((req, res, next) => {
  console.log(
    `[LOG] Requisição recebida em: ${new Date().toLocaleTimeString()}`,
  );
  next();
});

// Middleware customizado - adiciona timestamp à requisição
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString("pt-BR");
  next();
});

// ==================== BANCO DE DADOS SQLITE ====================

// Conexão com banco SQLite local
const connection = new sqlite3.Database("./database.db", (error) => {
  if (error) {
    console.log("❌ Erro na conexão ao SQLite: " + error.message);
  } else {
    console.log("✅ Conexão com SQLite estabelecida com sucesso!");
  }
});

// Criar tabela de tarefas se não existir
connection.serialize(() => {
  connection.run(
    "CREATE TABLE IF NOT EXISTS tasks (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "task TEXT, " +
      "status TEXT)",
  );
});

// ==================== ROTAS BÁSICAS ====================

// Página inicial - renderiza HTML
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "home.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("<h1>Erro ao carregar página inicial</h1>");
    }
  });
});

// Página sobre - retorna JSON
app.get("/sobre", (req, res) => {
  res.json({
    mensagem: "Página Sobre",
    nome: "Servidor Express Completo",
    descricao: "Integração de todos os recursos EXPRESS_0 até EXPRESS_10",
  });
});

// ==================== ROTAS DE PÁGINAS ====================

// Página de serviços - renderiza HTML
app.get("/servicos", (req, res) => {
  const filePath = path.join(__dirname, "views", "servicos.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("<h1>Página de Serviços não encontrada</h1>");
    }
  });
});

// Redirecionamento - acerca_de redireciona para sobre
app.get("/acerca_de", (req, res) => {
  res.redirect("/sobre");
});

// ==================== ROTAS COM PARÂMETROS ====================

// Saudação simples com nome
app.get("/ola/:nome", (req, res) => {
  const nome = req.params.nome;
  res.send(`<h1>Olá, ${nome}!</h1><p>Bem-vindo ao servidor Express!</p>`);
});

// Saudação com nome e empresa
app.get("/ola/:nome/:empresa", (req, res) => {
  const { nome, empresa } = req.params;
  res.json({
    saudacao: `Olá, ${nome}`,
    empresa: empresa,
    mensagem: `Bem-vindo da empresa ${empresa}!`,
  });
});

// Calculadora de soma
app.get("/soma/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const soma = a + b;
  res.json({
    operacao: "Soma",
    numero1: a,
    numero2: b,
    resultado: soma,
  });
});

// ==================== ROTAS COM PARÂMETROS COMPOSTOS ====================

// Distância entre pontos (com hífen)
app.get("/distancia/:pontoA-:pontoB", (req, res) => {
  const pontoA = parseFloat(req.params.pontoA);
  const pontoB = parseFloat(req.params.pontoB);
  const distancia = Math.abs(pontoB - pontoA);
  res.json({
    operacao: "Distância entre pontos",
    pontoA: pontoA,
    pontoB: pontoB,
    distancia: distancia,
  });
});

// Distância entre pontos (com ponto)
app.get("/distancia/:pontoA.:pontoB", (req, res) => {
  const pontoA = parseFloat(req.params.pontoA);
  const pontoB = parseFloat(req.params.pontoB);
  const distancia = Math.abs(pontoB - pontoA);
  res.json({
    operacao: "Distância entre pontos",
    pontoA: pontoA,
    pontoB: pontoB,
    distancia: distancia,
  });
});

// Calculadora de produto
app.get("/produto/:pA/:pB", (req, res) => {
  const pA = parseFloat(req.params.pA);
  const pB = parseFloat(req.params.pB);
  const produto = pA * pB;
  res.json({
    operacao: "Produto",
    numero1: pA,
    numero2: pB,
    resultado: produto,
  });
});

// ==================== ROTAS COM FUNÇÕES MODULARIZADAS ====================

// Adição usando módulo functions.js
app.get("/add/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = functions.add(a, b);
  res.json({
    operacao: "Adição (usando módulo)",
    numero1: a,
    numero2: b,
    resultado: resultado,
  });
});

// Subtração usando módulo functions.js
app.get("/sub/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = functions.sub(a, b);
  res.json({
    operacao: "Subtração (usando módulo)",
    numero1: a,
    numero2: b,
    resultado: resultado,
  });
});

// ==================== ROTAS DE CLIENTES ====================

// Array de clientes em memória
const clientesMemoria = [
  { id: 1, nome: "João Silva", email: "joao@email.com", empresa: "Tech Corp" },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    empresa: "Innovate Inc",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    empresa: "Digital Solutions",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    empresa: "Cloud Systems",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos@email.com",
    empresa: "Data Analytics",
  },
  {
    id: 6,
    nome: "Lucia Martins",
    email: "lucia@email.com",
    empresa: "Web Developers",
  },
];

// Total de clientes
app.get("/total_clientes", (req, res) => {
  res.json({
    total: clientesMemoria.length,
    mensagem: `Total de ${clientesMemoria.length} clientes cadastrados`,
  });
});

// Buscar cliente por ID
app.get("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientesMemoria.find((c) => c.id === id);

  if (cliente) {
    res.json({
      sucesso: true,
      cliente: cliente,
    });
  } else {
    res.status(404).json({
      sucesso: false,
      mensagem: `Cliente com ID ${id} não encontrado`,
    });
  }
});

// Listar todos os clientes
app.get("/clientes", (req, res) => {
  res.json({
    total: clientesMemoria.length,
    clientes: clientesMemoria,
  });
});

// ==================== ROTAS DO BANCO DE DADOS ====================

// Obter todas as tarefas do banco
app.get("/tasks", (req, res) => {
  connection.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      console.error("❌ ERRO NO BANCO:", err.message);
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao obter tarefas",
      });
    } else {
      res.json({
        sucesso: true,
        total: rows.length,
        tarefas: rows,
      });
    }
  });
});

// Adicionar nova tarefa ao banco
app.get("/tasks/add/:task/:status", (req, res) => {
  const { task, status } = req.params;
  const query = "INSERT INTO tasks (task, status) VALUES (?, ?)";

  connection.run(query, [task, status], (err) => {
    if (err) {
      console.error("❌ ERRO AO INSERIR:", err.message);
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao adicionar tarefa",
      });
    } else {
      res.json({
        sucesso: true,
        mensagem: "Tarefa adicionada com sucesso",
      });
    }
  });
});

// Setup inicial - popula banco com dados padrão
app.get("/setup", (req, res) => {
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";

  connection.run(query, ["Estudar rotas do Express", "concluído"]);
  connection.run(query, ["Configurar banco SQLite", "em andamento"]);
  connection.run(
    query,
    ["Testar a extensão SQLite Viewer", "pendente"],
    (err) => {
      if (err) {
        res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao popular dados",
        });
      } else {
        res.json({
          sucesso: true,
          mensagem: "✅ Ambiente configurado com sucesso",
          instrucoes: "Acesse /tasks para ver os dados",
        });
      }
    },
  );
});

// Setup customizado
app.get("/setup/iavorski", (req, res) => {
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";

  connection.run(
    query,
    ["Tirar nota boa na prova de quinta-feira", "em andamento"],
    (err) => {
      if (err) {
        res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao popular dados",
        });
      } else {
        res.json({
          sucesso: true,
          mensagem: "✅ Ambiente configurado com sucesso",
          instrucoes: "Acesse /tasks para ver os dados",
        });
      }
    },
  );
});

// ==================== ROTA DE INFORMAÇÕES ====================

// Informações do servidor
app.get("/info", (req, res) => {
  res.json({
    servidor: "Express Completo - Integração EXPRESS_0 até EXPRESS_10",
    porta: PORT,
    funcionalidades: [
      "Rotas básicas",
      "Renderização HTML",
      "Parâmetros dinâmicos",
      "Parâmetros compostos",
      "Funções modularizadas",
      "API de clientes em memória",
      "Banco de dados SQLite",
      "Logging com Morgan",
    ],
    requestTime: req.requestTime,
    horarioServidor: new Date().toLocaleString("pt-BR"),
  });
});

// ==================== ROTA 404 ====================

// Middleware para rotas não encontradas
app.use((req, res) => {
  const filePath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        sucesso: false,
        mensagem: "Página não encontrada",
        url_solicitada: req.url,
      });
    }
  });
});

// ==================== INICIAR SERVIDOR ====================

// Iniciar servidor na porta definida
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 Servidor Express Completo iniciado na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`${"=".repeat(60)}\n`);
});

app.get("/ola/:nome/:empresa", (req, res) => {
  const { nome, empresa } = req.params;
  res.json({
    saudacao: `Olá, ${nome}`,
    empresa: empresa,
    mensagem: `Bem-vindo da empresa ${empresa}!`,
  });
});

app.get("/soma/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const soma = a + b;
  res.json({
    operacao: "Soma",
    numero1: a,
    numero2: b,
    resultado: soma,
  });
});

// ==================== ROTAS COM PARÂMETROS COMPOSTOS (EXPRESS_08) ====================

app.get("/distancia/:pontoA-:pontoB", (req, res) => {
  const pontoA = parseFloat(req.params.pontoA);
  const pontoB = parseFloat(req.params.pontoB);
  const distancia = Math.abs(pontoB - pontoA);
  res.json({
    operacao: "Distância entre pontos",
    pontoA: pontoA,
    pontoB: pontoB,
    distancia: distancia,
  });
});

app.get("/distancia/:pontoA.:pontoB", (req, res) => {
  const pontoA = parseFloat(req.params.pontoA);
  const pontoB = parseFloat(req.params.pontoB);
  const distancia = Math.abs(pontoB - pontoA);
  res.json({
    operacao: "Distância entre pontos",
    pontoA: pontoA,
    pontoB: pontoB,
    distancia: distancia,
  });
});

app.get("/produto/:pA/:pB", (req, res) => {
  const pA = parseFloat(req.params.pA);
  const pB = parseFloat(req.params.pB);
  const produto = pA * pB;
  res.json({
    operacao: "Produto",
    numero1: pA,
    numero2: pB,
    resultado: produto,
  });
});

// ==================== ROTAS COM FUNÇÕES MODULARIZADAS (EXPRESS_09) ====================

app.get("/add/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = functions.add(a, b);
  res.json({
    operacao: "Adição (usando módulo)",
    numero1: a,
    numero2: b,
    resultado: resultado,
  });
});

app.get("/sub/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const resultado = functions.sub(a, b);
  res.json({
    operacao: "Subtração (usando módulo)",
    numero1: a,
    numero2: b,
    resultado: resultado,
  });
});

// ==================== ROTAS DE CLIENTES (EXPRESS_07) ====================

const clientesMemoria = [
  { id: 1, nome: "João Silva", email: "joao@email.com", empresa: "Tech Corp" },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    empresa: "Innovate Inc",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    empresa: "Digital Solutions",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@email.com",
    empresa: "Cloud Systems",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos@email.com",
    empresa: "Data Analytics",
  },
  {
    id: 6,
    nome: "Lucia Martins",
    email: "lucia@email.com",
    empresa: "Web Developers",
  },
];

app.get("/total_clientes", (req, res) => {
  res.json({
    total: clientesMemoria.length,
    mensagem: `Total de ${clientesMemoria.length} clientes cadastrados`,
  });
});

app.get("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientesMemoria.find((c) => c.id === id);

  if (cliente) {
    res.json({
      sucesso: true,
      cliente: cliente,
    });
  } else {
    res.status(404).json({
      sucesso: false,
      mensagem: `Cliente com ID ${id} não encontrado`,
    });
  }
});

app.get("/clientes", (req, res) => {
  res.json({
    total: clientesMemoria.length,
    clientes: clientesMemoria,
  });
});

// ==================== ROTAS DO BANCO DE DADOS (EXPRESS_10) ====================

// Obter todas as tarefas
app.get("/tasks", (req, res) => {
  connection.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      console.error("❌ ERRO NO BANCO:", err.message);
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao obter tarefas",
      });
    } else {
      res.json({
        sucesso: true,
        total: rows.length,
        tarefas: rows,
      });
    }
  });
});

// Adicionar uma nova tarefa
app.get("/tasks/add/:task/:status", (req, res) => {
  const { task, status } = req.params;
  const query = "INSERT INTO tasks (task, status) VALUES (?, ?)";

  connection.run(query, [task, status], (err) => {
    if (err) {
      console.error("❌ ERRO AO INSERIR:", err.message);
      res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao adicionar tarefa",
      });
    } else {
      res.json({
        sucesso: true,
        mensagem: "Tarefa adicionada com sucesso",
      });
    }
  });
});

// Rota de setup com dados padrão
app.get("/setup", (req, res) => {
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";

  connection.run(query, ["Estudar rotas do Express", "concluído"]);
  connection.run(query, ["Configurar banco SQLite", "em andamento"]);
  connection.run(
    query,
    ["Testar a extensão SQLite Viewer", "pendente"],
    (err) => {
      if (err) {
        res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao popular dados",
        });
      } else {
        res.json({
          sucesso: true,
          mensagem: "✅ Ambiente configurado com sucesso",
          instrucoes: "Acesse /tasks para ver os dados",
        });
      }
    },
  );
});

// Rota de setup customizada
app.get("/setup/iavorski", (req, res) => {
  const query = "INSERT INTO tasks (task, status) VALUES (?,?)";

  connection.run(
    query,
    ["Tirar nota boa na prova de quinta-feira", "em andamento"],
    (err) => {
      if (err) {
        res.status(500).json({
          sucesso: false,
          mensagem: "Erro ao popular dados",
        });
      } else {
        res.json({
          sucesso: true,
          mensagem: "✅ Ambiente configurado com sucesso",
          instrucoes: "Acesse /tasks para ver os dados",
        });
      }
    },
  );
});

// ==================== ROTA DE INFORMAÇÕES DO SERVIDOR ====================

app.get("/info", (req, res) => {
  res.json({
    servidor: "Express Completo - Integração EXPRESS_0 até EXPRESS_10",
    porta: PORT,
    funcionalidades: [
      "Rotas básicas",
      "Renderização HTML",
      "Parâmetros dinâmicos",
      "Parâmetros compostos",
      "Funções modularizadas",
      "API de clientes em memória",
      "Banco de dados SQLite",
      "Logging com Morgan",
    ],
    requestTime: req.requestTime,
    horarioServidor: new Date().toLocaleString("pt-BR"),
  });
});

// ==================== ROTA 404 ====================

app.use((req, res) => {
  const filePath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        sucesso: false,
        mensagem: "Página não encontrada",
        url_solicitada: req.url,
      });
    }
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 Servidor Express Completo iniciado na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`${"=".repeat(60)}\n`);
});
