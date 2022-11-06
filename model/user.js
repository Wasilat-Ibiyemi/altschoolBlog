const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userModel = new Schema({
    email: { type: String, unique: [true, 'email already exists!'], required: [true, 'input your email'] },
    first_name: { type: String, required: [true, 'input first name'] },
    last_name: { type: String, required: [true, 'input last name'] },
    user_name: { type: String, required: [true, 'input your username'], unique: [true, 'username already exists!'] },
    password: { type: String, required: true },
    articles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    }
})

//hashes password before savind data to database
userModel.pre(
    'save',
    async function (next) {
        let user = this

        if (!user.isModified('password'))
            return next()

        try {
            const hash = await bcrypt.hash(this.password, 10)
            this.password = hash
            next()
        } catch (err) {
            next(error)
        }
    }
)

//compares prev logged in password
userModel.methods.isValidPassword = async function (password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

//modifies response sent back to the client and concealing password
userModel.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.password
    },
})


module.exports = mongoose.model('user', userModel)