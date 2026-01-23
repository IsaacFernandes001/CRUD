const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors') 
const db = require('./connection');

app.use(express.json()); // para a aplicação usar o formato json
app.use(cors())

// listar usuários pelo ID
app.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    const [rows] = await db.query(`select * from usuarios where id=${id}`);
    return res.json(rows);
});

// listar todos os usuários
app.get('/usuarios', async (_req, res) => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return res.json(rows);
});

// cadastrar usuários
app.post('/usuarios', async (req, res) => {
    const {nome, email, senha} = req.body;
    try{
       const result = await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
        return res.status(200).json({
        id: result[0].insertId,
        nome,
        email
    });
    } catch{
        return res.status(400).json({ msg: 'Erro ao cadastrar usuário'})
    }
    
});

app.put('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, email} = req.body;
    await db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    return res.json({
        msg: 'usuário editado com sucesso'
    });
});

app.delete('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return res.json({
        msg: 'usuário apagado da existência com sucesso'
    });
});


app.post('/login', async (req, res) => {
    const {email, senha} = req.body;
    try{
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', email);
    if(rows.length > 0 && senha === rows[0].senha) {//caso o email exista e a senha tá OK
        return res.status(200).json({
            statusCode: 200,
            msg: `Seja bem vindo ${rows[0].nome}`,
        });
        } else{
            return res.status(200).json({
                statusCode: 401,
                msg: 'Tem parada errada ai irmão',
            });
        }
    }
    catch(error){
        console.log(error)
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em localhost:${port}`);
})