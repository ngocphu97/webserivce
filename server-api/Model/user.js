var connection = require('../connection');

function Todo() {

  this.demo = (res) => {
    res.send('Hello, route to "/todo" for magic stuff');
  }

  this.get = (res) => {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM users', function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = (field_data, res) => {
    connection.acquire(function (err, con) {
      con.query('insert into todo_list set ?', field_data, function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'TODO creation failed' });
        } else {
          res.send({ status: 0, message: 'TODO created successfully' });
        }
      });
    });
  };

  this.update = (field_data, res) => {
    connection.acquire(function (err, con) {
      con.query('update todo_list set ? where id = ?', [field_data, field_data.id], function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'TODO update failed' });
        } else {
          res.send({ status: 0, message: 'TODO updated successfully' });
        }
      });
    });
  };

  this.read = (id, res) => {
    connection.acquire(function (err, con) {
      con.query('select * from todo_list where id=?', [id], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.delete = (id, res) => {
    connection.acquire(function (err, con) {
      con.query('delete from todo_list where id = ?', [id], function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'Failed to delete' });
        } else {
          res.send({ status: 0, message: 'Deleted successfully' });
        }
      });
    });
  };
}

module.exports = new Todo();