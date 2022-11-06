const mongoose = require('mongoose')

require('dotenv').config()

const URL = process.env.MDB_URL

function connectDB() {
    mongoose.connect(URL)

    mongoose.connection.on('connected', () => {
        console.log('Successfully connected to Mongodb')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err)
        console.log('Failed connection')
    })
}

module.exports = connectDB