const mongoose = require('mongoose');
const config = require('./config')
require('dotenv').config()

class Database {
    constructor(){
        this.connect();
    }

    connect() {
        mongoose.Promise = global.Promise;
        console.log('MongoDB is running')
        return mongoose.connect(`mongodb:mongodb+srv://${config.user}:${config.pass}@compassolisa-cluster.foj5w.mongodb.net/${config.name}?retryWrites=true&w=majority`)
    }
}

module.exports = new Database().connect();
