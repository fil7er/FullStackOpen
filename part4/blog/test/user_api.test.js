const bycrypt = require('bcrypt');
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../schema/userSchema')

const initialUsers = [
    {
        username: 'root',
        name: 'Superuser',
        password: 'sekret',
        _id: '5a422'

    }
]

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
}, 100000)

test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')
    const usernames = response.body.map(r => r.username)
    expect(usernames).toContain('root')}, 100000)

test('if username is missing, return 400 Bad Request', async () => {
    const newUser = new User({
        name: "Teste da Silva",
        password: "123456"
    })
    await api.post('/api/users').send(newUser).expect(400)}, 100000)

test('if username is less than 3 characters, return 400 Bad Request', async () => {
    const newUser = new User({
        username: "Te",
        name: "Teste",
        password: "123456"
    })
    await api.post('/api/users').send(newUser).expect(400)}, 100000)


beforeEach(async () => {
    await User.deleteMany({_id: {$exists: true}})
    initialUsers.forEach(async (user) => {
        const passwordHash = await bycrypt.hash(user.password, 10)
        const userSave = new User({username: user.username, name: user.name, passwordHash})      
        await userSave.save()
    })
}, 100000)

