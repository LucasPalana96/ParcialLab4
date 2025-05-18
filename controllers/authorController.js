const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find().populate('libros');
  res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id).populate('libros');
  if (!author) return res.status(404).send('Autor no encontrado');
  res.json(author);
};

exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    if (author.nombre == "") {
      return res.status(404).send('El nombre del autor no puede estar vacio')
    }
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).send('Autor no encontrado');
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).send('Autor no encontrado');
  res.send('Autor eliminado');
};

exports.addBookToAuthor = async (req, res) => {
  const { id, bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) return res.status(400).send('Libro no existe');

  const author = await Author.findById(id);
  if (!author) return res.status(404).send('Autor no encontrado');

  if (!author.libros.includes(bookId)) {
    author.libros.push(bookId);
    await author.save();
  }

  res.json(author);
};
