var mysql = require('mysql');

function Connection() {

  this.pool = null;

  this.init = function () {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'manageuser'
    });
  };

  this.acquire = (callback) => {
    this.pool.getConnection((err, connection) => {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();