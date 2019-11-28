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

function proposalImport() {

  this.getProposalImport = (_request, response) => {
    let proposalImportQuery = '';
    proposalImportQuery =
      'select proposal_import.id, proposal_import.bookId, proposal_import.amount, proposal_import.date, proposal_import.status, '
      + 'books.name as bookName '
      + 'from proposal_import '
      + 'left join books on proposal_import.bookId = books.id '
      + 'ORDER BY proposal_import.id DESC';

    queryDB(connection, response, proposalImportQuery, '');
  };

  this.getProposalImportById = (request, response) => {
    const proposalImportQuery =
      'select proposal_import.id, proposal_import.bookId, '
      + 'books.name as bookName, proposal_import.amount, proposal_import.date, proposal_import.status '
      + 'from proposal_import left join books on proposal_import.bookId = books.id '
      + 'where proposal_import.id = ?';

    queryDB(connection, response, proposalImportQuery, request.id);
  };

  this.createProposalImport = (fieldData, response) => {
    const proposalImportQuery = 'insert into proposal_import set ?';
    queryDB(connection, response, proposalImportQuery, fieldData);
  };

  this.updateProposalImport = (fieldData, response) => {

    connection.acquire((error, connection) => {
      if (error) {
        response.send(error);
      } else {
        connection.query('select status from proposal_import where id = ?', fieldData.id, (error, result) => {
          if (error) {
            response.send(error);
          } else {
            if (result[0].status.toString() === 'true') {
              response.send({
                code: 405,
                mess: 'ko the update dc '
              });
              connection.release();
            } else if (result[0].status.toString() === 'false') {

              console.log(1, '=>', result[0].status);

              const proposalImportQuery = 'update proposal_import set ? where id = ?';

              updateBookAmount(fieldData.amount, fieldData.bookId, response);

              connection.query(proposalImportQuery, [fieldData, fieldData.id], (error, result) => {
                if (error) {
                  response.send(error);
                } else {
                  connection.release();
                  response.send(result);
                }
              });

            }
          }
        }, (error) => {
          response.send(error);
        });
      }
    });

  };


  function updateBookAmount(amount, id, response) {

    connection.acquire((error, connection) => {
      if (error) {
        response.send(error);
      } else {
        connection.query('select amount from books where id = ?', id, (error, result) => {
          if (error) {
            response.send(error);
          } else {
            const newAmount = parseInt(result[0].amount, 0) + amount;
            connection.query('update books set amount = ? where id = ?', [newAmount, id], (error, _result) => {
              if (error) {
                response.send(error);
              } else {
                connection.release();
              }
            }, (error) => { 
              response.send(error);
            });
          }
        }, (error) => {
          response.send(error);
        });
      }

    });
  }
}

module.exports = new proposalImport();
