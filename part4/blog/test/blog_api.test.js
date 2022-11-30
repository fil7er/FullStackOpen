const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../schema/blogSchema')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Canonical string reduction'
    )
}, 100000)

test('if likes is missing, default to 0', async () => {
    const newBlog = new Blog({
        title: "Test blog 2",
        author: "Test",
        url: "http://test.com"
    })
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)
    expect(likes).toContain(0)
}, 100000)

test('if create a new blog, the number of blogs increases by one', async () => {
    const newBlog = new Blog({
      title: "New blog",
      author: "Teste",
      url: "http://teste.com",
      likes: 5
    })
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
}, 100000)


test('if title or url is missing, return 400 Bad Request', async () => {
    const newBlog = new Blog({
      author: "Teste"
    })
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

test('if delete a blog, the number of blogs decreases by one', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(initialBlogs.length - 1)
}, 100000)


test('if update a blog likes, it will return the altered value', async() =>{
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  await api
    .put(`/api/blogs/${blog.id}`)
    .send({likes: 100})
    .expect(200)
  const response2 = await api.get('/api/blogs')
  const blog2 = response2.body[0]
  expect(blog2.likes).toBe(100)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  initialBlogs.forEach(async blog => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('done')
})


