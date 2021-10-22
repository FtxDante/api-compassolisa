require('dotenv').config()

const config = {
    name : process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

module.exports = config