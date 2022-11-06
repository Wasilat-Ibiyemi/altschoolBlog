const user = require('../model/user')

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body
        //create a new user

        const newSignUp = new user({
            firstName, lastName, username, email, password
        })
        //save user into database
        const createSignUp = await newSignUp.save()

        return res.status(201).json({
            data: createSignUp
        })
    } catch (error) {
        next(error)
    }
}

module.exports = createUser