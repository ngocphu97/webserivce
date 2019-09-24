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

module.exports = router;