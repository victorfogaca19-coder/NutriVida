const express = require('express');
const router = express.Router();
const Fazenda = require('../models/Fazenda');

function autenticado(req, res, next) {
  if (!req.session.usuario) return res.redirect('/auth/login');
  next();
}

router.get('/', async (req, res) => {
  try {
    const fazendas = await Fazenda.find().sort({ criadoEm: -1 });
    res.render('fazendas', { fazendas });
  } catch (err) {
    res.status(500).send('Erro ao carregar fazendas.');
  }
});

router.get('/nova', autenticado, (req, res) => {
  res.render('fazenda-form', { fazenda: null, erro: null });
});

router.post('/', autenticado, async (req, res) => {
  const { nome, localizacao, tipo, descricao } = req.body;

  if (!nome || !localizacao || !tipo) {
    return res.render('fazenda-form', { fazenda: null, erro: 'Preencha os campos obrigatórios.' });
  }

  try {
    const nova = new Fazenda({
      nome, localizacao, tipo, descricao,
      usuario: req.session.usuario.id
    });
    await nova.save();
    res.redirect('/fazendas');
  } catch (err) {
    res.render('fazenda-form', { fazenda: null, erro: 'Erro ao cadastrar fazenda.' });
  }
});

router.get('/api', async (req, res) => {
  try {
    const fazendas = await Fazenda.find().sort({ criadoEm: -1 });
    res.json(fazendas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar fazendas.' });
  }
});

router.get('/api/:id', async (req, res) => {
  try {
    const fazenda = await Fazenda.findById(req.params.id);
    if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada.' });
    res.json(fazenda);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar fazenda.' });
  }
});

router.put('/api/:id', autenticado, async (req, res) => {
  try {
    const { nome, localizacao, tipo, descricao } = req.body;
    const atualizada = await Fazenda.findByIdAndUpdate(
      req.params.id,
      { nome, localizacao, tipo, descricao },
      { new: true }
    );
    if (!atualizada) return res.status(404).json({ erro: 'Fazenda não encontrada.' });
    res.json({ sucesso: 'Fazenda atualizada!', fazenda: atualizada });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar fazenda.' });
  }
});

router.delete('/api/:id', autenticado, async (req, res) => {
  try {
    await Fazenda.findByIdAndDelete(req.params.id);
    res.json({ sucesso: 'Fazenda removida.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover fazenda.' });
  }
});

module.exports = router;
