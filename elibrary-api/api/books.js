const express = require('express');
const router = express.Router();

const books = require('../model/books');

const tryCall = ((request) => {
  try {
    return request;
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router
  .get('/', (_request, response) => {
    tryCall(books.getBooks(response));
  })

  .get('/:id/', (request, response) => {
    tryCall(books.getBookById(request.params, response));
  })

  .get('/photo/:bookId/', (request, response) => {
    tryCall(books.getBookCover(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(books.createBook(request.body, response));
  })

  .post('/upload', (request, response) => {
    tryCall(books.uploadBookCover(request, response));
  })

  .put('/:id/', (request, response) => {
    tryCall(books.updateBook(request.body, response))
  })

  .delete('/:id', (request, response) => {
    tryCall(books.deleteBook(request.params, response))
  });

module.exports = router;