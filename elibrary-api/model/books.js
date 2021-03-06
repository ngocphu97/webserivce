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

function Books() {

  this.getBooks = (request, response) => {
    let bookQuery = '';
    if (request && request.query.cover) {
      bookQuery = `select * from books`;
    } else {
      bookQuery =
        ' SELECT books.id, books.sku, books.category_id, books.name, books.author, books.cost, books.retailPrice, '
        + ' books.amount, books.distributor, books.language, books.size,'
        + ' books.totalPage, books.translator, books.publishDate, books.description, cover.photo,'
        + ' temp.bookshelf_id as bookshelfId, temp.name as locationName, temp.decription as locationDescription '
        + ' FROM books '
        + ' LEFT JOIN cover ON books.id = cover.bookId '
        + ' LEFT JOIN ( SELECT * '
        + '             FROM bookshelf_location_entity '
        + '             LEFT JOIN booshelf_location on booshelf_location.id = bookshelf_location_entity.bookshelf_id) temp '
        + '             ON temp.book_id = books.id';
    }
    queryDB(connection, response, bookQuery, '');
  };

  this.getBookById = (request, response) => {

    const bookQuery =
      ' SELECT books.id, books.sku, books.category_id, books.name, books.author, books.cost, books.retailPrice, categories.name, books.description, '
      + ' books.amount, books.distributor, books.language, books.size,'
      + ' temp.bookshelf_id as bookshelfId, temp.name as locationName, temp.decription as locationDescription '
      + ' FROM books '
      + ' left join categories on books.category_id = categories.id'
      + ' LEFT JOIN ( SELECT * '
      + '             FROM bookshelf_location_entity '
      + '             LEFT JOIN booshelf_location on booshelf_location.id = bookshelf_location_entity.bookshelf_id) temp '
      + '             ON temp.book_id = books.id'
      + ' WHERE books.id = ?';

    queryDB(connection, response, bookQuery, request.id);
  };


  this.createBook = (fieldData, response) => {
    const bookQuery = 'insert into books set ?';
    queryDB(connection, response, bookQuery, fieldData);
  };

  this.searchBooks = (fieldData, response) => {
    const bookQuery =
      'SELECT books.id, sku, name, author, cost, retailPrice, amount, distributor, language, size, totalPage, translator, publishDate, description, cover.photo '
      + 'FROM books '
      + 'LEFT JOIN cover ON books.id = cover.bookId '
      + `WHERE books.name LIKE '%${fieldData.searchKey}%'`;

    querySearch(connection, response, bookQuery, fieldData.searchKey);
  };

  this.getMostSearchForTimeLine = (reqeset, response) => {
    const bookQuery = `
        SELECT t.bookId, history_search.sku, history_search.name, history_search.date_search, c.photo, COUNT(history_search.sku) AS numberOfSearch
        FROM history_search
        LEFT JOIN (SELECT books.sku, books.id as bookId from books) t ON history_search.sku = t.sku
        LEFT JOIN (SELECT cover.photo, cover.bookId as coverBookId from cover) c ON bookId = c.coverBookId
        GROUP BY history_search.sku
        HAVING date_search > DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
        ORDER BY COUNT(history_search.sku) DESC
        LIMIT 5 `;

    queryDB(connection, response, bookQuery, reqeset.num_days);
  };

  this.createHistorySearch = (fieldData, response) => {
    const bookQuery = 'insert into history_search set ?'
    queryDB(connection, response, bookQuery, [fieldData.bookHistorySearch]);
  };

  this.getLocationFromSKU = (reqeset, response) => {
    const bookQuery = 'SELECT sku, books.name, bl.name, x, y '
      + 'FROM bookshelf_location_entity be '
      + 'LEFT JOIN books ON be.book_id = books.id '
      + 'LEFT JOIN booshelf_location bl ON be.bookshelf_id = bl.id '
      + 'WHERE books.sku = ?;';
    queryDB(connection, response, bookQuery, reqeset.sku);
  };

  this.getBookByCategory = (reqeset, response) => {
    const bookQuery = 'SELECT sku, name, author, cost, retailPrice, amount, inventory FROM `books` WHERE category_id = ?';
    queryDB(connection, response, bookQuery, reqeset.categoryId);
  };

  this.getRelateBook = (request, response) => {
    const bookQuery =
      `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo FROM books
    LEFT JOIN cover ON books.id = cover.bookId
    WHERE category_id in (SELECT category_id FROM books WHERE sku = ?)
    LIMIT 10;`;
    queryDB(connection, response, bookQuery, request.sku);
  };

  this.updateBook = (fieldData, response) => {
    const bookQuery = 'update books set ? where id = ?';
    queryDB(connection, response, bookQuery, [fieldData, fieldData.id]);
  };

  this.deleteBook = (fieldData, response) => {
    console.log('Log Message: this.deleteBook -> fieldData', fieldData);
    deleteCover(fieldData.id, response);
    const bookQuery = 'delete from books where id = ?';
    queryDB(connection, response, bookQuery, fieldData.id);

  };

  this.uploadBookCover = (request, response) => {

    if (!request.files || Object.keys(request.files).length === 0) {
      return res.status(400).send({ mess: '' });
    }

    let sampleFile = request.files.image;

    const fieldData = {
      bookId: 1,
      photo: sampleFile.data
    }

    const bookQuery = 'insert into cover set ?';
    queryDB(connection, response, bookQuery, fieldData);
  }

  this.uploadBookCoverPhoto = (request, response) => {
    const bookQuery = 'insert into cover set photo = ?, bookId = ?';
    queryDB(connection, response, bookQuery, [request.photo, request.bookId]);
  }

  this.getBookCover = (request, response) => {
    const bookQuery = 'select * from cover where bookId = ?';
    queryDB(connection, response, bookQuery, request.bookId);
  }

  this.updateBookCoverPhoto = (request, response) => {

    const bookQuery = 'update cover set photo = ? where bookId = ?';

    connection.acquire((error, connection) => {
      if (error) {
        response.send(error);
      } else {
        connection.query(bookQuery, [request.photo, request.bookId], (error, result) => {
          if (error) {
            response.send(error);
          } else {
            if (result.affectedRows === 0) {
              insertCover(request.photo, request.bookId, response);
            } else {
              connection.release();
              response.send(result);
            }
          }
        }, (error) => {
          response.send(error);
        });
      }
    });

  }

  function insertCover(photo, bookId, response) {

    connection.acquire((error, connection) => {
      if (error) {
        response.send(error);
      } else {
        connection.query('insert into cover set photo = ?, bookId = ?', [photo, bookId], (error, result) => {
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

  function deleteCover(bookId, response) {
    console.log('Log Message: deleteCover -> bookId', bookId);

    const queries = [
      `delete from cover where bookId = ${bookId}; `,
      `delete from bookshelf_location_entity where book_id = ${bookId}; `,
      `delete from proposal_import where bookId = ${bookId}`
    ]

    queries.forEach(query => {

      connection.acquire((error, connection) => {
        if (error) {
          response.send(error);
        } else {
          connection.query(query, (_error, _results, _fields) => {
            console.log(_results);
            console.log(_error);
            console.log(_fields);
            connection.release();
          });
        }
      });

    });


  }
}

module.exports = new Books();
