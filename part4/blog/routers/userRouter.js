const userRouter = require('express').Router();
const {findAllUsers, findUserById, createUser, updateUserPassword, deleteUser} = require('../controllers/userController');
const middleware = require('../utils/middleware');

userRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

userRouter.get('/', middleware.tokenExtractor, findAllUsers);

userRouter.get('/:id', middleware.tokenExtractor, findUserById);

userRouter.post('/', middleware.tokenExtractor, createUser);

userRouter.put('/:id', middleware.tokenExtractor, updateUserPassword);

userRouter.delete('/:id', middleware.tokenExtractor, deleteUser);

module.exports = userRouter;