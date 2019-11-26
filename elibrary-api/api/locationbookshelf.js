const express = require('express');
const router = express.Router();

const locationbookshelf = require('../model/locationbookshelf');

const tryCall = ((request) => {
  try {
    return request;
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router
  .get('/', (_request, response) => {
    tryCall(locationbookshelf.getLocation(response));
  })

  .get('/getLocationFromSKU/:sku', (request, response) => {
    tryCall(locationbookshelf.getLocationFromSKU(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(locationbookshelf.createLocation(request.body, response));
  })

  .put('/:id/', (request, response) => {
    tryCall(locationbookshelf.updateLocation(request.body, response))
  })

module.exports = router;
