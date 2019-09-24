let books = require('./model/books');

module.exports = {
  configure: (app) => {

    app.get('/books', (request, response) => {
      books.getBooks(response);
    });

    app.get('/books/:id/', (request, response) => {
      books.getBookById(request.params, response);
    });

    app.get('/books/photo/:bookId/', (request, response) => {
      books.getBookCover(request.params, response);
    });

    app.post('/books/upload', (request, response) => {
      console.log('vo day')
      books.uploadBookCover(request, response);
    });

    app.post('/books', (request, response) => {
      books.createBook(request.body, response);
    });

    app.put('/books/:id/', (req, res) => {
      books.updateBook(req.body, res);
    });

  }
};
