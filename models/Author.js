const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  bio: String,
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },
  libros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
}, { collection: 'Authors' }); 

module.exports = mongoose.model('Author', authorSchema); 