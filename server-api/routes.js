var todo = require('./Model/user');

module.exports = {
  configure: (app) => {
    app.get('/todo/', (req, res) => {
      todo.get(res);
    });

    app.get('/todo/read/:id/', (req, res) => {
      todo.read(res);
    });

    app.post('/todo/create', (req, res) => {
      todo.create(req.body, res);
    });

    app.put('/todo/update', (req, res) => {
      todo.update(req.body, res);
    });

    app.delete('/todo/delete/:id/', (req, res) => {
      todo.delete(req.params.id, res);
    });
  }
};