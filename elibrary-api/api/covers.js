const express = require('express');
const router = express.Router();

const covers = require('../model/covers');

const tryCall = ((request) => {
  try {
    return request;
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router

  .get('/photo/:bookId/', (request, response) => {
    tryCall(books.getBookCover(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(covers.createCover(request.body, response));
  })

  .put('/:bookId/', (request, response) => {
    tryCall(covers.updateCover(request.body, request.params, response))
  })

module.exports = router;
