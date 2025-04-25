const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Configurações do middleware
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'crud_user',          
    password: 'crud_pass', 
    database: 'crud_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o MySQL:', err);
    } else {
        console.log('Conexão com o MySQL estabelecida com sucesso!');
    }
});

// Endpoint para listar todos os usuários
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Endpoint para retornar um usuário específico pelo ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results[0]);
        }
    });
});

// Endpoint para criar um novo usuário
app.post('/api/users', (req, res) => {
    const { name, anoNascimento, endereco, genero, cpf } = req.body;
    const sql = 'INSERT INTO users (name, anoNascimento, endereco, genero, cpf) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, anoNascimento, endereco, genero, cpf], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Usuário criado com sucesso!', userId: results.insertId });
        }
    });
});

// Endpoint para atualizar um usuário existente
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, anoNascimento, endereco, genero, cpf } = req.body;
    const sql = 'UPDATE users SET name = ?, anoNascimento = ?, endereco = ?, genero = ?, cpf = ? WHERE id = ?';
    db.query(sql, [name, anoNascimento, endereco, genero, cpf, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Usuário atualizado com sucesso!' });
        }
    });
});

// Endpoint para deletar um usuário
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Usuário removido com sucesso!' });
        }
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
