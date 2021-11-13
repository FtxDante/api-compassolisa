const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../app/swagger.json');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.use('/api-docs', swaggerUi.serve);
  routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

  server.use(prefix, routes);
};
