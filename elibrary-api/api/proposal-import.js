const express = require('express');
const router = express.Router();

const proposalImport = require('../model/proposal-import');

const tryCall = ((request) => {
  try {
    return request;
  } catch (error) {
    res.json({ error: error.message || error.toString() });
  }
});

router
  .get('/', (request, response) => {
      tryCall(proposalImport.getProposalImport(request, response));
  })

  .get('/:id/', (request, response) => {
    tryCall(proposalImport.getProposalImportById(request.params, response));
  })

  .post('/', (request, response) => {
    tryCall(proposalImport.createProposalImport(request.body, response));
  })

  .put('/:id/', (request, response) => {
    tryCall(proposalImport.updateProposalImport(request.body, response))
  })

  

module.exports = router;
