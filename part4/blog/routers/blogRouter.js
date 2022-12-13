const blogRouter = require('express').Router()
const { getAll, create, update, remove } = require('../controllers/blogController')

blogRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
)

blogRouter.get('/', (req, res, next) => getall(req, res, next)) 

blogRouter.get('/:id', (req, res, next) => get(req, res, next))

blogRouter.post('/', (req, res, next) => create(req, res, next))

blogRouter.put('/:id', (req, res, next) => update(req, res, next))

blogRouter.delete('/:id', (req, res, next) => remove(req, res, next))

module.exports = blogRouter

