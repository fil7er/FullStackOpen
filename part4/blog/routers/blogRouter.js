const blogRouter = require('express').Router();
const {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog} = require('./util/mongo')

blogRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

blogRouter.get('/api/blogs', async (request, response, next) => {
    try{
        const blogs = await getAllBlogs()
        response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.get('/api/blogs/:id', async (request, response, next) => {
    try{
        const blog = await getBlogById(request.params.id)
        response.json(blog)
    }
    catch (error) {
       next(error)
    }
})

blogRouter.post('/api/blogs', async (request, response, next) => {
    try{
        const blog = await createBlog(request.body)
        response.json(blog)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.put('/api/blogs/:id', async (request, response, next) => {
    try{
        const blog = await updateBlog(request.params.id, request.body)
        response.json(blog)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.delete('/api/blogs/:id', async (request, response, next) => {
    try{
        const blog = await deleteBlog(request.params.id)
        response.json(blog)
    }
    catch (error) {
        next(error)
    }
})

module.exports = blogRouter