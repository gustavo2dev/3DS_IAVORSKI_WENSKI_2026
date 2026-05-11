# 🧪 Guia de Testes - Servidor Express Completo

## Passos para Testar o Servidor

### 1. **Preparação Inicial**

```bash
cd EXPRESS_COMPLETO
npm install
npm start
```

Você verá na console:

```
============================================================
🚀 Servidor Express Completo iniciado na porta 3000
📍 Acesse: http://localhost:3000
============================================================
```

---

## 2. **Testes de Rotas**

### A. Página Inicial e Básicas

- ✅ http://localhost:3000/ → Abre página HTML com lista de rotas
- ✅ http://localhost:3000/sobre → Retorna JSON com info "Página Sobre"
- ✅ http://localhost:3000/info → Retorna dados do servidor
- ✅ http://localhost:3000/servicos → Abre página de serviços

### B. Redirecionamento

- ✅ http://localhost:3000/acerca_de → Redireciona para /sobre (EXPRESS_03)

### C. Rotas com Parâmetros (EXPRESS_06)

- ✅ http://localhost:3000/ola/João → Saudação customizada
- ✅ http://localhost:3000/ola/João/TechCorp → Saudação com empresa
- ✅ http://localhost:3000/soma/10/20 → Resultado: 30
- ✅ http://localhost:3000/soma/5/3 → Resultado: 8

### D. Parâmetros Compostos (EXPRESS_08)

- ✅ http://localhost:3000/distancia/10-50 → Distância com hífen
- ✅ http://localhost:3000/distancia/10.50 → Distância com ponto
- ✅ http://localhost:3000/produto/5/3 → Resultado: 15

### E. Funções Modularizadas (EXPRESS_09)

- ✅ http://localhost:3000/add/15/5 → Resultado: 20 (usando functions.js)
- ✅ http://localhost:3000/sub/20/8 → Resultado: 12 (usando functions.js)

### F. API de Clientes (EXPRESS_07)

- ✅ http://localhost:3000/clientes → Lista todos os 6 clientes
- ✅ http://localhost:3000/clientes/1 → Retorna "João Silva"
- ✅ http://localhost:3000/clientes/3 → Retorna "Pedro Oliveira"
- ✅ http://localhost:3000/clientes/99 → Erro 404 (cliente não existe)
- ✅ http://localhost:3000/total_clientes → Total: 6

### G. Banco de Dados SQLite (EXPRESS_10)

```bash
# 1. Primeiro, populate o banco
http://localhost:3000/setup

# 2. Agora veja as tarefas
http://localhost:3000/tasks

# 3. Adicione uma nova tarefa
http://localhost:3000/tasks/add/Estudar%20JavaScript/pendente

# 4. Veja as tarefas novamente
http://localhost:3000/tasks
```

### H. Erro 404

- ✅ http://localhost:3000/rota-inexistente → Abre página 404.html

---

## 3. **Testes no Console (Terminal)**

Você verá logs como:

```
[LOG] Requisição recebida em: 14:30:45
Método=GET | Status=200 | URL=/ | Tempo=12.50 ms

[LOG] Requisição recebida em: 14:30:46
Método=GET | Status=200 | URL=/soma/10/20 | Tempo=5.25 ms

[LOG] Requisição recebida em: 14:30:47
Método=GET | Status=404 | URL=/inexistente | Tempo=2.15 ms
```

---

## 4. **Verificação do Banco de Dados**

### Opção 1: Instalar SQLite Viewer (Extensão VS Code)

1. Vá para Extensions
2. Procure "SQLite"
3. Instale "SQLite Viewer" de Alexcvzz
4. Abra arquivo `database.db` no VS Code
5. Veja as tabelas `tasks` e `clients`

### Opção 2: Linha de Comando

```bash
sqlite3 database.db
sqlite> SELECT * FROM tasks;
sqlite> SELECT * FROM clients;
sqlite> .quit
```

---

## 5. **Checklist de Funcionalidades**

- [ ] Página inicial carrega com sucesso
- [ ] Todas as rotas básicas funcionam
- [ ] Parâmetros dinâmicos funcionam (/ola/:nome)
- [ ] Parâmetros compostos funcionam (/distancia/10-50)
- [ ] Funções modularizadas funcionam (/add/:a/:b)
- [ ] API de clientes retorna dados
- [ ] Banco de dados cria tabelas
- [ ] Comando /setup popula dados
- [ ] /tasks retorna dados do banco
- [ ] Novas tarefas são inseridas
- [ ] Logging do Morgan aparece no console
- [ ] Middleware de timestamp funciona
- [ ] Redirecionamento /acerca_de → /sobre funciona
- [ ] Página 404 carrega para rotas inexistentes

---

## 6. **Cenários de Teste Completo**

### Cenário 1: Cliente novo testando a API

```
1. Acessa http://localhost:3000/
2. Vê toda a lista de rotas
3. Clica em /clientes para ver dados
4. Clica em /tasks para ver tarefas
```

### Cenário 2: Testes matemáticos

```
1. http://localhost:3000/soma/100/50 → 150
2. http://localhost:3000/produto/12/5 → 60
3. http://localhost:3000/add/33/17 → 50
4. http://localhost:3000/sub/100/25 → 75
5. http://localhost:3000/distancia/0-100 → 100
```

### Cenário 3: Gerenciamento de tarefas

```
1. http://localhost:3000/setup → Setup inicial
2. http://localhost:3000/tasks → Ver 3 tarefas
3. http://localhost:3000/tasks/add/Estudar%20Java/em%20andamento
4. http://localhost:3000/tasks → Agora tem 4 tarefas
5. Abra database.db no VS Code com SQLite Viewer para verificar
```

---

## 7. **Possíveis Problemas**

### Problema: Erro "Cannot find module 'express'"

**Solução:** Execute `npm install`

### Problema: Porta 3000 já está em uso

**Solução:**

- Feche outras aplicações
- Ou altere a porta em `server.js` (line: `const PORT = 3000;`)

### Problema: Arquivo database.db não é criado

**Solução:** Verifique permissões da pasta, ou execute como administrador

### Problema: Erro na rota /setup

**Solução:** Verifique se `database.db` foi criado, ou delete e reinicie o servidor

---

## 8. **Rotas Rápidas para Testar**

Copie e cole no navegador:

```
http://localhost:3000/
http://localhost:3000/ola/Maria/DevCorp
http://localhost:3000/soma/42/8
http://localhost:3000/produto/7/6
http://localhost:3000/add/99/1
http://localhost:3000/sub/50/15
http://localhost:3000/distancia/5-95
http://localhost:3000/clientes
http://localhost:3000/tasks
http://localhost:3000/info
http://localhost:3000/setup
```

---

✅ **Todos os testes passaram?** Parabéns! Seu servidor Express Completo está funcionando perfeitamente!
