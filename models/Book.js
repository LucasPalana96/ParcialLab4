const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  resumen: String,
  genero: { type: String, required: true },
  publicacion: { type: Date, required: true },
  disponible: { type: Boolean, required: true }
}, { collection: 'Books' });

module.exports = mongoose.model('Book', bookSchema);