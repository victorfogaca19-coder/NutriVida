const express = require('express');
const router = express.Router();

// GET / — Página inicial
router.get('/', (req, res) => {
  res.render('home');
});

// GET /sobre — Página sobre nós
router.get('/sobre', (req, res) => {
  res.render('sobre');
});

module.exports = router;
