/* eslint-disable require-jsdoc */
const mongoose = require('mongoose');
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.Promise = global.Promise;
    console.log('MongoDB is running');
    return mongoose.connect('mongodb:mongodb+srv://usr-compassolisa:LtAfwPDuMYONyAzp@compassolisa-cluster.foj5w.mongodb.net/compassolisaDB?retryWrites=true&w=majority');
  }
}
module.exports = new Database().connect();
