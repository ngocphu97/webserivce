const express = require('express');
const router = express.Router();

const users = require('../model/users');

const tryCall = ((request) => {
  try {
    request
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router
  .get('/', (_request, response) => {
    tryCall(users.getUsers(response));
  })

  .post('/login', (request, response) => {
    tryCall(users.login(request.body, response));
  })

module.exports = router;
