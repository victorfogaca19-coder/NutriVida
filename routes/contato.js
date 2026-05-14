const express = require('express');
const router = express.Router();
const Contato = require('../models/Contato');

// GET /contato — Página de contato
router.get('/', (req, res) => {
  res.render('contato', { sucesso: null, erro: null });
});

// POST /contato — Salva mensagem no banco
router.post('/', async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !telefone || !mensagem) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const novoContato = new Contato({ nome, email, telefone, mensagem });
    await novoContato.save();
    res.status(201).json({ sucesso: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao enviar mensagem.' });
  }
});

// GET /contato/mensagens — Lista todas as mensagens (admin)
router.get('/mensagens', async (req, res) => {
  try {
    const mensagens = await Contato.find().sort({ criadoEm: -1 });
    res.render('mensagens', { mensagens });
  } catch (err) {
    res.status(500).send('Erro ao buscar mensagens.');
  }
});

// DELETE /contato/:id — Remove uma mensagem
router.delete('/:id', async (req, res) => {
  try {
    await Contato.findByIdAndDelete(req.params.id);
    res.json({ sucesso: 'Mensagem removida.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover mensagem.' });
  }
});

module.exports = router;
