const userRouter = require('express').Router()
const {findAllUsers, findUserById, createUser, updateUserPassword, deleteUser} = require('../controllers/userController')
const middleware = require('../util/middleware')

userRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

userRouter.get('/', (req, res, next) => findAllUsers(req, res, next))

userRouter.get('/:id', (req, res, next) => findUserById(req, res, next))

userRouter.post('/', (req, res, next) => createUser(req, res, next))

userRouter.put('/:id', (req, res, next) => updateUserPassword(req, res, next))

userRouter.delete('/:id', (req, res, next) => deleteUser(req, res, next))

module.exports = userRouter;