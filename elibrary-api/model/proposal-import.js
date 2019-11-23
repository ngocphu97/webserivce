let connection = require('../connection');

let queryDB = (connection, response, query, fieldData) => {
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        if (error) {
          response.send(error);
        } else {
          connection.release();
          response.send(result);
        }
      }, (error) => {
        response.send(error);
      });
    }
  });
}

let querySearch = (connection, response, query, fieldData, page) => {
  var page = (page < 1 ? 1 : page) || 1;
  var items = 12;
  var indexStart, indexEnd;
  indexStart = (page - 1) * items;
  indexEnd = indexStart + items;
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        if (error) {
          response.send(error);
        } else {
          connection.release();
          response.send(result.slice(indexStart, indexEnd));
        }
      }, (error) => {
        response.send(error);
      });
    }
  });
}

function proposalImport() {

  this.getProposalImport = (request, response) => {
    let proposalImportQuery = '';
      proposalImportQuery = `select proposal_import.bookId, books.name as bookName, proposal_import.amount, proposal_import.date, proposal_import.status from proposal_import left join books on proposal_import.bookId=books.id
      ORDER BY proposal_import.id DESC
      limit 10`;
      queryDB(connection, response, proposalImportQuery, '');
  };

  this.getProposalImportById = (reqeset, response) => {
    const proposalImportQuery = 'select proposal_import.bookId, books.name as bookName, proposal_import.amount, proposal_import.date, proposal_import.status from proposal_import left join books on proposal_import.bookId=books.id where proposal_import.id = ?';
    queryDB(connection, response, proposalImportQuery, reqeset.id);
  };

  this.createProposalImport = (fieldData, response) => {
    const proposalImportQuery = 'insert into proposal_import set ?';
    queryDB(connection, response, proposalImportQuery, fieldData);
  };

  this.updateProposalImport = (fieldData, response) => {
    const proposalImportQuery = 'update proposal_import set ? where id = ?';
    queryDB(connection, response, proposalImportQuery, [fieldData, fieldData.id]);
  };
}

module.exports = new proposalImport();
