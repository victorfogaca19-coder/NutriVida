const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// GET /auth/cadastro — Página de cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro', { erro: null, sucesso: null });
});

// POST /auth/cadastro — Cria novo usuário
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.render('cadastro', { erro: 'Preencha todos os campos.', sucesso: null });
  }

  try {
    const jaExiste = await Usuario.findOne({ email });
    if (jaExiste) {
      return res.render('cadastro', { erro: 'Email já cadastrado.', sucesso: null });
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res.render('cadastro', { erro: null, sucesso: 'Cadastro realizado com sucesso! Faça login.' });
  } catch (err) {
    res.render('cadastro', { erro: 'Erro ao cadastrar. Tente novamente.', sucesso: null });
  }
});

// GET /auth/login — Página de login
router.get('/login', (req, res) => {
  res.render('login', { erro: null });
});

// POST /auth/login — Autentica usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.render('login', { erro: 'Preencha todos os campos.' });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.render('login', { erro: 'Email ou senha incorretos.' });
    }

    const senhaCorreta = await usuario.verificarSenha(senha);
    if (!senhaCorreta) {
      return res.render('login', { erro: 'Email ou senha incorretos.' });
    }

    req.session.usuario = { id: usuario._id, nome: usuario.nome, email: usuario.email };
    res.redirect('/');
  } catch (err) {
    res.render('login', { erro: 'Erro ao fazer login. Tente novamente.' });
  }
});

// GET /auth/logout — Encerra sessão
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// GET /api/usuarios — Lista usuários (rota REST)
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-senha'); // oculta senha
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
});

module.exports = router;
