const passport = require('passport')

const express = require('express')
const userRouter = express.Router()

const authController = require('../controller/authenticateController')

userRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), authController.signUp
);
userRouter.post('/login', passport.authenticate('login', { session: false }), authController.login)

module.exports = userRouter