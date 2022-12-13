const loginRouter = require('express').Router()
const {login} = require('../controllers/loginController')
const middleware = require('../util/middleware')

loginRouter.post('/', (req, res, next) => login(req, res, next));

module.exports = loginRouter