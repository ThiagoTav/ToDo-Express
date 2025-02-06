const express = require('express');
const router = express.Router();
const db = require('../services/db');
const { ObjectId } = require('mongodb');

const checkBody = (req, res, next) => {
    if ("_id" in req.body) {
        console.log("ID recebido:", req.body._id); // Log para depuração
        req.body._id = new ObjectId(req.body._id);
    } else {
        console.error("ID não encontrado no corpo da requisição");
        return res.status(400).send({ error: "ID não fornecido" });
    }
    next();
};

// Rota para adicionar um novo documento
router.post('/add', async (req, res) => {
    const results = await db.insertDocuments(req.body);
    res.send(results)
});

// Rota para listar todos os documentos
router.get('/list', async (req, res) => {
    const results = await db.findDocuments();
    res.send(results);
});

// Rota para atualizar um documento
router.patch('/update', checkBody, async (req, res) => {
    const results = await db.updateDocument(req.body);
    res.send(results);
});

// Rota para deletar um documento
router.delete('/delete', checkBody, async (req, res) => {
    const results = await db.removeDocument(req.body);
    res.send(results);
});

module.exports = router;
