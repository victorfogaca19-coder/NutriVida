const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://localhost:27017/nutrivida';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log('Erro MongoDB:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'nutrivida-secret-2024',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

const rotasHome      = require('./routes/home');
const rotasAuth      = require('./routes/auth');
const rotasContato   = require('./routes/contato');
const rotasProblemas = require('./routes/problemas');
const rotasFazendas  = require('./routes/fazendas');

app.use('/',          rotasHome);
app.use('/auth',      rotasAuth);
app.use('/contato',   rotasContato);
app.use('/problemas', rotasProblemas);
app.use('/fazendas',  rotasFazendas);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
