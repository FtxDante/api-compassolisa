const {Router} = require('express');
const test = require('./carRoutes');
module.exports = (server) => {
  server.use((req, res, next) =>{
    test(server, new Router());
    next();
  });
};
