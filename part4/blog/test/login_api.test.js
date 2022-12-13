const bycrypt = require('bcrypt');
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app.use(logErrors))
const User = require('../schema/userSchema');
const { before } = require('lodash');

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
  }



test('if username is missing, return 400 Bad Request', async () => {
    const passwordHash = await bycrypt.hash("123456", 10)
    const newUser = new User({
        name: "Teste da Silva",
        passwordHash: passwordHash
    })
    await api.post('/api/login').send(newUser).expect(400)}, 100000)

test('if username is less than 3 characters, return 400 Bad Request', async () => {
    const passwordHash = await bycrypt.hash("123456", 10)
    const newUser = new User({
        username: "Te",
        name: "Teste",
        passwordHash: passwordHash
    })
    await api.post('/api/login').send(newUser).expect(400)}, 100000)

test('if success, return token', async () => {
    const passwordHash = await bycrypt.hash("123456", 10)
    const newUser = new User({
        username: "zepta",
        name: "Teste 2",
        passwordHash: passwordHash
    })
    var response = await api.post('/api/login').send(newUser)
    console.log(response.body)
    expect(response.body.token).toBeDefined()
}, 100000)


beforeEach(async () => {
    await User.deleteMany({_id: {$exists: true}})
    const passwordHash = await bycrypt.hash("123456", 10)
    const userSave = new User({
        username: "zepta",
        name: "Teste 2",
        passwordHash: passwordHash
    })
    await userSave.save()
}, 100000)
