const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleModel = new Schema({
    title: { type: String, required: true, unique: true },
    description: String,
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    state: { type: String, default: 'draft', enum: ['draft', 'published'] },
    read_count: { type: Number, default: 0 },
    reading_time: Number,
    tags: [String],
    body: String,
}, { timestamps: true })


articleModel.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('article', articleModel)