const mongoose = require('mongoose');

class Database {
    constructor(){
        this.connect();
    }

    connect() {
        mongoose.Promise = global.Promise;
        console.log('MongoDB is running')
        return mongoose.connect('mongodb://localhost/compassolisa')
    }
}

module.exports = new Database().connect();