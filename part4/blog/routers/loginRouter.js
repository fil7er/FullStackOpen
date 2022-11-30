const loginRouter = require('express').Router()
const {login} = require('../controllers/loginController')
const middleware = require('../utils/middleware')

loginRouter.post('/', middleware.tokenExtractor, login);

module.exports = loginRouter