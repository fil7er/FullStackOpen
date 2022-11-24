const mongoose = require('mongoose')
const config = require('./config')
const Blog = require('../schema/blogSchema')
const logger = require('./logger')

const mongoUrl = config.MONGO_URL
const mongoUser = config.MONGO_USERNAME
const mongoPassword = config.MONGO_PASSWORD

const mongoUrlWithCredentials = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/?retryWrites=true&w=majority`

const connectToMongo = async() => {
    return mongoose.connect(mongoUrlWithCredentials, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        logger.info('connected to MongoDB')
    })
}

const getAllBlogs = async() => {
    try {
        await connectToMongo()
        const blogs = await Blog.find({})
        return blogs.map(blog => blog.toJSON())
    }
    catch (error) {
        throw new Error('Error getting all blogs:', error.message)
    }
    finally {
        mongoose.connection.close()
    }
    
}

const getBlogById = async(id) => {
    try {
        await connectToMongo()
        const blog = await Blog.findById(id)
        return blog.toJSON()
    }
    catch (error) {
        throw new Error('Error getting blog by id:', error.message)
    }
    finally {
        mongoose.connection.close()
    }
}

const createBlog = async(blog) => {
    try {
        await connectToMongo()
        const newBlog = new Blog(blog)
        const savedBlog = await newBlog.save()
        return savedBlog.toJSON()
    }
    catch (error) {
        throw error
    }
    finally {
        mongoose.connection.close()
    }
}

const updateBlog = async(id, blog) => {
    try {
        await connectToMongo()
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})
        return updatedBlog.toJSON()
    }
    catch (error) {
        throw new Error('Error updating blog:', error.message)
    }
    finally {
        mongoose.connection.close()
    }
}

const deleteBlog = async(id) => {
    try {
        await connectToMongo()
        await Blog.findByIdAndRemove(id)
    }
    catch (error) {
        throw new Error('Error deleting blog:', error.message)
    }
    finally {
        mongoose.connection.close()
    }
}

module.exports = {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog}
