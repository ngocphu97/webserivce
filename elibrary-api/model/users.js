let connection = require('../connection');

let getUsersQuery = (connection, response, query, fieldData) => {
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

let loginQuery = (connection, response, query, fieldData) => {
  connection.acquire((error, connection) => {
    if (error) {
      response.send(error);
    } else {
      connection.query(query, fieldData, (error, result) => {
        if (error) {
          response.send({
            ok: false,
            status: 400,
            statusText: 'Not found',
            message: 'Đã có lỗi xảy ra, hãy kiểm tra lại',
          });
        } else {
          connection.release();
          if (result.length > 0) {
            response.send({ status: 200, result: result });
          } else {
            response.send({
              status: 200,
              result: null,
              statusText: 'Not found',
              message: 'Email hoặc mật khẩu không đúng',
            });
          }
        }
      }, (error) => {
        response.send(error);
      });
    }
  });
}

function Users() {
  this.getUsers = (response) => {
    const usersQuery = 'select * from users';
    getUsersQuery(connection, response, usersQuery, '');
  };

  this.login = (fieldData, response) => {
    const usersQuery = 'SELECT id, name, email FROM `users` WHERE `email` = ? and `password` = ?';
    loginQuery(connection, response, usersQuery, [fieldData.email, fieldData.password]);
  };
}

module.exports = new Users();
