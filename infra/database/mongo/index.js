/* eslint-disable require-jsdoc */
const mongoose = require('mongoose');

const config = require('./config');
require('dotenv').config();

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.Promise = global.Promise;
    console.log('MongoDB is running');

    return mongoose.connect(
      `mongodb:mongodb+srv://${config.user}:${config.pass}@${config.host}/${config.name}?retryWrites=true&w=majority`
      // 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
    );
  }
}

module.exports = new Database();
