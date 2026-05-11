# 🚀 Servidor Express Completo - Integração EXPRESS_0 até EXPRESS_10

Um servidor Express totalmente funcional que integra todas as funcionalidades dos 11 projetos EXPRESS desenvolvidos durante o curso.

## 📋 Funcionalidades Integradas

### ✅ EXPRESS_0 & EXPRESS_07

- **API de Clientes** em memória com 6 clientes cadastrados
- Rotas para listar total de clientes e buscar por ID

### ✅ EXPRESS_01

- Rotas básicas (/, /sobre)
- Estrutura fundamental do Express

### ✅ EXPRESS_02 & EXPRESS_03

- **Renderização de páginas HTML**
- Páginas: Home, Serviços, Sobre
- Redirecionamento automático (/acerca_de → /sobre)
- Tratamento de erro 404 customizado

### ✅ EXPRESS_04

- **Middlewares customizados**
- Log de timestamp em cada requisição
- Adição de `requestTime` ao objeto request

### ✅ EXPRESS_05

- **Logging com Morgan**
- Formato customizado: Método, Status, URL, Tempo de resposta

### ✅ EXPRESS_06

- **Rotas com parâmetros dinâmicos**
- `/ola/:nome` - Saudação personalizada
- `/ola/:nome/:empresa` - Saudação com empresa
- `/soma/:a/:b` - Calculadora de soma

### ✅ EXPRESS_08

- **Rotas com parâmetros compostos**
- `/distancia/:pontoA-:pontoB` - Com hífen
- `/distancia/:pontoA.:pontoB` - Com ponto
- `/produto/:pA/:pB` - Multiplicação

### ✅ EXPRESS_09

- **Modularização com funções externas**
- Arquivo `functions.js` com operações matemáticas
- Importação com `require()`

### ✅ EXPRESS_10

- **Banco de dados SQLite**
- Tabela de `tasks` (id, task, status)
- Tabela de `clients` (id, name, email, company)
- Persistência de dados em arquivo `database.db`

## 🛠️ Instalação e Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

Ou com nodemon (modo desenvolvimento):

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

## 📍 Rotas Disponíveis

### Páginas HTML

- `GET /` - Página inicial com lista de todas as rotas
- `GET /servicos` - Página de serviços
- `GET /sobre` - Informações sobre
- `GET /acerca_de` - Redireciona para /sobre

### Informações

- `GET /info` - Detalhes do servidor e recursos

### Clientes (API)

- `GET /clientes` - Lista todos os clientes
- `GET /clientes/:id` - Busca cliente por ID
- `GET /total_clientes` - Total de clientes cadastrados

### Operações Matemáticas

- `GET /soma/:a/:b` - Soma dois números
- `GET /produto/:pA/:pB` - Multiplica dois números
- `GET /add/:a/:b` - Soma (usando módulo functions.js)
- `GET /sub/:a/:b` - Subtração (usando módulo functions.js)
- `GET /distancia/:pontoA-:pontoB` - Distância entre pontos (com hífen)
- `GET /distancia/:pontoA.:pontoB` - Distância entre pontos (com ponto)

### Personalizadas

- `GET /ola/:nome` - Saudação personalizada
- `GET /ola/:nome/:empresa` - Saudação com empresa

### Banco de Dados (SQLite)

- `GET /tasks` - Lista todas as tarefas
- `GET /tasks/add/:task/:status` - Adiciona nova tarefa
- `GET /setup` - Popula banco com dados padrão de exemplo
- `GET /setup/iavorski` - Popula banco com dados customizados

## 📊 Exemplos de Uso

### Teste as rotas:

```
http://localhost:3000/
http://localhost:3000/ola/João
http://localhost:3000/ola/João/TechCorp
http://localhost:3000/soma/10/20
http://localhost:3000/produto/5/3
http://localhost:3000/distancia/10-50
http://localhost:3000/add/15/5
http://localhost:3000/sub/20/8
http://localhost:3000/clientes
http://localhost:3000/clientes/1
http://localhost:3000/tasks
http://localhost:3000/setup
http://localhost:3000/info
```

## 💾 Banco de Dados

### Tabela: tasks

| Campo  | Tipo    | Descrição                                            |
| ------ | ------- | ---------------------------------------------------- |
| id     | INTEGER | ID único (chave primária, auto-incremento)           |
| task   | TEXT    | Descrição da tarefa                                  |
| status | TEXT    | Status da tarefa (pendente, em andamento, concluído) |

### Tabela: clients

| Campo   | Tipo    | Descrição                                  |
| ------- | ------- | ------------------------------------------ |
| id      | INTEGER | ID único (chave primária, auto-incremento) |
| name    | TEXT    | Nome do cliente                            |
| email   | TEXT    | Email do cliente                           |
| company | TEXT    | Empresa do cliente                         |

## 📦 Dependências

```json
{
  "express": "^4.18.2",
  "sqlite3": "^6.0.1",
  "morgan": "^1.10.1",
  "nodemon": "^3.0.1" (dev)
}
```

## 🗂️ Estrutura do Projeto

```
EXPRESS_COMPLETO/
├── server.js           # Servidor principal
├── functions.js        # Funções modularizadas
├── package.json        # Configuração do projeto
├── database.db         # Banco de dados SQLite (criado automaticamente)
└── views/
    ├── home.html       # Página inicial
    ├── servicos.html   # Página de serviços
    └── 404.html        # Página de erro
```

## 🎯 Características Principais

- ✅ **Express.js** - Framework web rápido e minimalista
- ✅ **SQLite3** - Banco de dados SQL leve e embarcado
- ✅ **Morgan** - Middleware de logging HTTP
- ✅ **Middlewares Customizados** - Processamento de requisições
- ✅ **Rotas Dinâmicas** - Parâmetros simples e compostos
- ✅ **Modularização** - Código organizado e reutilizável
- ✅ **HTML5** - Páginas responsivas e modernas
- ✅ **Persistência de Dados** - Armazenamento em SQLite

## 🚀 Como Expandir

Para adicionar novas funcionalidades:

1. **Novas rotas**: Adicione em `server.js`
2. **Novas funções**: Adicione em `functions.js` e exporte via `module.exports`
3. **Novas páginas**: Crie em `views/` e renderize com `res.sendFile()`
4. **Novas tabelas**: Use `connection.run()` na seção de criação de tabelas

## 📝 Notas

- O banco de dados SQLite é criado automaticamente na primeira execução
- Os middlewares Morgan e custom são aplicados a todas as requisições
- Os dados de clientes são armazenados em memória (não persistem após reiniciar)
- As tarefas são persistidas no banco de dados SQLite

## 👨‍💻 Autores

**Iavorski e Wenski**

---

**Desenvolvido para fins educacionais - Integração de conceitos de Express.js**
