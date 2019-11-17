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
  .get('/', (request, response) => {
    tryCall(books.getBooks(request.query.categories, response));
  })

  //http://localhost:3000/books/search?searchKey=Nhung&page=2
  .get('/search', (request, response) => {
    tryCall(books.searchBooks(request.query, response));
  })

  .get('/:id/', (request, response) => {
    tryCall(books.getBookById(request.params, response));
  })

  .get('/mostsearch/:num_days', (request, response) => {
    tryCall(books.getMostSearchForTimeLine(request.params, response));
  })

  .get('/getForCategories/:categoryId/', (request, response) => {
    tryCall(books.getBookByCategory(request.params, response));
  })

  .get('/getRelateBook/:sku', (request, response) => {
    tryCall(books.getRelateBook(request.params, response));
  })

  .get('/photo/:bookId/', (request, response) => {
    tryCall(books.getBookCover(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(books.createBook(request.body, response));
  })

  /*
      url: http://localhost:3000/books/createHistorySearch
      param:
          {
          "sku": "8935244835199",
          "name": "Thám Tử Lừng Danh Conan - Tập 96"
          }
  */
  .post('/createHistorySearch', (request, response) => {
    tryCall(books.createHistorySearch(request.body, response));
  })

  .post('/deleteBook', (request, response) => {
    tryCall(books.deleteBook(request.body, response));
  })

  .put('/:id/', (request, response) => {
    tryCall(books.updateBook(request.body, response))
  })

module.exports = router;
