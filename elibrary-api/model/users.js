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

let queryDB2 = (connection, response, query, fieldData) => {
	connection.acquire((error, connection) => {
		if (error) {
			response.send(error);
		} else {
			connection.query(query, fieldData, (error, result) => {
				if (error) {
					response.send({status: fail, message: error});
				} else {
          connection.release();
          response.send({status: true, result: result});
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
		queryDB(connection, response, usersQuery, '');
  };

  this.login = (fieldData, response) => {
	  const usersQuery = 'SELECT name, email FROM `users` WHERE `email` = ? and `password` = ?';
	  queryDB2(connection, response, usersQuery, [fieldData.email, fieldData.password]);
	};
}

module.exports = new Users();
