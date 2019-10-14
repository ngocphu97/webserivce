const express = require('express');
const router = express.Router();

const categories = require('../model/categories');

const tryCall = ((request) => {
  try {
    return request;
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router
  .get('/', (_request, response) => {
    tryCall(categories.getCategoriess(response));
  })

  .get('/getCategoryForAmount', (_request, response) => {
    tryCall(categories.getCategoryForAmount(response));
  })

  .get('/:id/', (request, response) => {
    tryCall(categories.getCategoriesById(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(categories.createCategories(request.body, response));
  })

  .put('/:id/', (request, response) => {
    tryCall(categories.updateCategories(request.body, response))
  })

  .delete('/:id', (request, response) => {
    tryCall(categories.deleteCategories(request.params, response))
  });

module.exports = router;
