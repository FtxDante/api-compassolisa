const morgan = require('morgan');
const express = require('express');
const router = require('./routes');
require('./infra/database/mongo');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;
