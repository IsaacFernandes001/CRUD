const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const db = require('./connection')

app.use(express.json())
app.use (cors());

app.get('/usuarios', async (req, res) => {
    const [rows] = await db.query('select * from usuarios')
    return res.json(rows)
})

app.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    const [rows] = await db.query(`select * from usuarios where id=${id}`)
    return res.json(rows);
})

app.post('/usuarios', async (req, res) => {
    const {nome, email} = req.body
    try{
       const result = await db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email])
        return res.status(200).json({
            id: result[0].insertId,
            nome,
            email
        });
    }catch(error){
        return res.status(400).json({msg: 'Erro ao cadastrar usuário.'})
    }
})

app.put('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, email} = req.body;
    await db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    return res.json({msg: 'usuário editado com sucesso'});
})

app.delete('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    await db.query('DELETE FROM usuarios WHERE id= ?', [id]);
    return res.json({msg: 'usuário delete com sucesso'});
})

app.listen(port, () => {
    console.log(`Servidor rodadando em http://localhost:${port}`)
})