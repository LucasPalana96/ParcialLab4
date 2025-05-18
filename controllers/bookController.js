const Book = require('../models/Book');
const Author = require('../models/Author');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Libro no encontrado');
  res.json(book);
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    if (book.nombre == "") {
      return res.status(404).send('El nombre del libro no puede estar vacio')
    }
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send('Libro no encontrado');
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Libro no encontrado');
    
    const authorWithBook = await Author.findOne({ libros: req.params.id });
    if (authorWithBook) return res.status(500).send('El libro pertenece a un autor');

    await Book.findByIdAndDelete(req.params.id);
    res.send('Libro eliminado');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
