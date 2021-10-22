const {Router} = require('express');
const cars = require('./carRoutes');
const peoples = require('./peopleRoutes');
module.exports = (server) => {
  server.use((req, res, next) =>{
    cars(server, new Router());
    peoples(server, new Router());
    next();
  });
};
