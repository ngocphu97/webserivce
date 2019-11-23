const swaggerUi = require('swagger-ui-express');

const booksRoutes = require('./books');
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const swaggerDocument = require('./swagger.json');
const proposalImportRoutes = require('./proposal-import');

const api = ((app) => {
	app.use('/books', booksRoutes);
  app.use('/users', usersRoutes);
  app.use('/proposal-import', proposalImportRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

module.exports = api;
