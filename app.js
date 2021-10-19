const express = require('express');
const router = require('./routes');
require('./infra/database/mongo');
require('./app/schema/testeModels'); // Apenas para teste, apague quando entender o funcionamento.

class App {

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    router(this.server)
  }
 
}

module.exports = new App().server;
