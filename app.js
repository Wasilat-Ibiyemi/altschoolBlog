const express = require('express')
const connectDb = require('./db')
const mongoose = require('mongoose');
const passport = require('passport')


const userRoute = require('./route/authenticateRoute');
const blogRoute = require('./route/articleRouter');
const publicRoute = require('./route/pubRoute')




require('dotenv').config()
require("./authenticate/auth")(passport)

const PORT = process.env.PORT
const app = express()

//connect to mongodb
connectDb()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())




app.use('/', userRoute);
app.use('/', publicRoute);

app.use('/blog', passport.authenticate('jwt', { session: false }), blogRoute)


app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to Altschool Blog"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`)
})