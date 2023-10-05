require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = 3000

connectDB()

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
})

mongoose.connection.on('error', error => {
    console.log(error)
})