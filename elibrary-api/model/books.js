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

  this.getBooks = (query, response) => {
    let bookQuery = '';
    if (query) {
      bookQuery = `select * from books where category_id = ${query}`;
    } else {
      bookQuery = `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo  FROM books LEFT JOIN cover ON books.id = cover.bookId where deleted=1`;
    }
    queryDB(connection, response, bookQuery, '');
  };

  this.createBook = (fieldData, response) => {
    const bookQuery = 'insert into books set ?';
    queryDB(connection, response, bookQuery, fieldData);
  };

  this.createHistorySearch = (fieldData, response) => {
    const bookQuery = 'insert into history_search set ?';
    queryDB(connection, response, bookQuery, fieldData);
  };

  this.searchBooks = (query, response) => {
    const bookQuery = `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo FROM books LEFT JOIN cover ON books.id = cover.bookId WHERE books.name LIKE '%${query.searchKey}%';`;
    querySearch(connection, response, bookQuery, query.searchKey, query.page);
  };

  this.getBookById = (reqeset, response) => {
    const bookQuery = 'select * from books where id = ?';
    queryDB(connection, response, bookQuery, reqeset.id);
  };

  this.getMostSearchForTimeLine = (reqeset, response) => {
    const bookQuery = `SELECT his.sku, his.name, his.date_search, cover.photo, COUNT(his.sku) AS NumberOfSearch
    FROM history_search his
    LEFT JOIN books ON his.sku = books.sku
    LEFT JOIN cover ON books.id = cover.bookId
    GROUP BY his.sku
    HAVING date_search > DATE_SUB(CURRENT_DATE(), INTERVAL ? DAY)
    ORDER BY COUNT(his.sku) DESC
    LIMIT 5`;
    queryDB(connection, response, bookQuery, reqeset.num_days);
  };

  this.getBookByCategory = (reqeset, response) => {
    const bookQuery = 'SELECT sku, name, author, cost, retailPrice, amount, inventory FROM `books` WHERE category_id = ?';
    queryDB(connection, response, bookQuery, reqeset.categoryId);
  };

  this.getRelateBook = (request, response) => {
    const bookQuery = `SELECT sku, name, author, cost, retailPrice, amount, inventory, distributor, language, size, totalPage, translator, publishDate, description, cover.photo FROM books
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
    const bookQuery = 'UPDATE books set deleted = 0 WHERE id =?;';
    queryDB(connection, response, bookQuery, fieldData.id);
  };

  this.getBookCover = (request, response) => {
    const bookQuery = 'select * from cover where bookId = ?';
    queryDB(connection, response, bookQuery, request.bookId);
  }
}

module.exports = new Books();
