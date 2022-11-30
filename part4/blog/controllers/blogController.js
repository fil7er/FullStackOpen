const blogRouter = require('express').Router();
const Blog = require('../schema/blogSchema');

blogRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    }
    catch (error) {
        next(error);
    }
})

blogRouter.get('/:id', async (request, response, next) => {
    try{
        const blog = await Blog.findById(request.params.id);
        if(blog) {
            response.json(blog);
        }
        else {
            response.status(404).end();
        }
    }
    catch (error) {
        next(error);
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const user = request.user;
        const body = request.body;
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url
        });
        const savedBlog = await blog.save();
        response.json(savedBlog);
    }
    catch (error) {
        next(error);
    }

})

blogRouter.put('/:id', async (request, response, next) => {
    try{
        const body = request.body;
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog);
    }
    catch (error) {
        next(error);
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const user = request.user;
        const blog = await Blog.findById(request.params.id);
        if(blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id);
            response.status(204).end();
        }
        else {
            response.status(401).json({error: 'unauthorized'});
        }
    }
    catch (error) {
        next(error);
    }
})

module.exports = blogRouter