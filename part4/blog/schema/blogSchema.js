const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Blog title is required"], unique: true},
    author: {type: String, required: [true, "Blog author is required"]},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url: {type: String, required: [true, "Blog url is required"]},
    likes: {type: Number, default: 0}})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog