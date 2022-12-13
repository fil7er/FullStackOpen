const loginRouter = require('express').Router()
const {login} = require('../controllers/loginController')
const middleware = require('../util/middleware')

loginRouter.post('/', middleware.tokenExtractor, login);

module.exports = loginRouter