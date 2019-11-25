const swaggerUi = require('swagger-ui-express');

const booksRoutes = require('./books');
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const proposalImportRoutes = require('./proposal-import');
const locationsRoutes = require('./locationbookshelf');
const swaggerDocument = require('./swagger.json');

const api = ((app) => {
  app.use('/books', booksRoutes);
  app.use('/users', usersRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/location', locationsRoutes);
  app.use('/proposal-import', proposalImportRoutes);
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

module.exports = api;
