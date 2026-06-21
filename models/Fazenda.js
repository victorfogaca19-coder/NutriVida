const mongoose = require('mongoose');

const fazendaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  localizacao: { type: String, required: true },
  tipo: { type: String, required: true },
  descricao: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fazenda', fazendaSchema);
