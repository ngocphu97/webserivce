const books = require('./Model/books');

module.exports = {
  configure: (app) => {

    app.get('/books', (req, res) => {
      books.get(res);
    })

    app.post('/books', (req, res) => {
      books.xxx(req.body, res);
    })

    app.get('/books/:id/', (req, res) => {
      books.read(req.params, res);
    });

    app.put('/books/:id/', (req, res) => {
      books.update(req.params, res);
    });

    app.post('/books/upload', (req, res) => {
      books.create(req, res);
    });

  }
};