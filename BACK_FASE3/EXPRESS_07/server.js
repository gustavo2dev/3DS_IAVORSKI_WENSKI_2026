const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Servidor no ar')
})

const cliente = [
    { id: 1, nome: 'Jebao', fone: '123', email: 'jebao@email' },
    { id: 2, nome: 'Jebasso', fone: '456', email: 'jebasso@email' },
    { id: 3, nome: 'Jeba', fone: '789', email: 'jeba@email' },
    { id: 4, nome: 'Jebagg', fone: '101', email: 'jeba.gg@email' },
    { id: 5, nome: 'cleiton', fone: '111', email: 'Aloko@email' },
    { id: 6, nome: 'breinjela', fone: '222', email: 'beringelinha@email' }
];

// rotas
app.get('/', (req, res) => {
    res.send("Seja bem vindo á nossa API de Clientes");
})

// rota que apresenta o total de clientes
app.get('/total_cliente', (req, res) => {
    res.send('Total de clientes da bodega: ' + cliente.length)
})

// rota para apresentar dados de um cliente específico
app.get('/cliente/:id', (req, res) => {
    const clientes = cliente.find(c => c.id === parseInt(req.params.id));

    if (!clientes) {
        res.status(404).send("Cliente não encontrado!!");
    } else {
        res.send(`O cliente é: ${clientes.nome}, telefone: ${clientes.fone}, email: ${clientes.email}`);
    }
})