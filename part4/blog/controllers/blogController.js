const Blog = require('../schema/blogSchema');
const jwt = require('jsonwebtoken');

getTokenFrom = request => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

getall = async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    }
    catch (error) {
        next(error);
    }
}

get = async (request, response, next) => {
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
}

create = async (request, response, next) => {
    try {
        const body = request.body;
        const token = getTokenFrom(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!token || !decodedToken.id) {
            return response.status(401).json({error: 'token missing or invalid'});
        }
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: decodedToken.id
        });
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    }
    catch (error) {
        next(error);
    }
}

update = async (request, response, next) => {
    try {
        const body = request.body;
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        };
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
        response.json(updatedBlog);
    }
    catch (error) {
        next(error);
    }
}

remove = async (request, response, next) => {
    try {
        const token = getTokenFrom(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!token || !decodedToken.id) {
            return response.status(401).json({error: 'token missing or invalid'});
        }
        const blog = await Blog.findById(request.params.id);
        if(blog.user.toString() === decodedToken.id.toString()) {
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
}

module.exports = {
    getall,
    get,
    create,
    update,
    remove
}