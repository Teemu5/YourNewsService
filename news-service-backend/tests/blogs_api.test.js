const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


var token

describe('HTTP GET request to the /api/blogs url', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })
  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  var res = []
  test('returns two blogs', async () => {
    const response = await api.get('/api/blogs')
    res = response
    expect(response.body).toHaveLength(2)
  })

  test('returns a specific blog within the returned blogs', async () => {
    const response = res

    const urls = response.body.map(r => r.url)

    expect(urls).toContain('www.test.com')
  })
  test('unique identifier property id is defined for all blogs', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(b => expect(b.id).toBeDefined())
  })
})

describe('HTTP POST request to the /api/blogs url', () => {

  beforeEach(async () => {

    await User.deleteMany({})
    await Blog.deleteMany({})
    // add user for logins
    const initUser = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(initUser)
      .expect(200)

    //login before request
    const logCred = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    }
    const logRes = await api.post('/api/login').send(logCred).expect(200)

    token = logRes.body.token


  })
  test('successfully adds a item to list', async () => {

    const users = await helper.usersInDb()
    const userId = users[0].id

    const blog = {
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 777,
      userId: userId
    }

    const sent = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blog).expect(200)
    const endBlogs = await helper.blogsInDb()

    expect(endBlogs.length).toBe(1)
  })
  test('successfully adds a blog and the new blog is saved', async () => {

    const users = await helper.usersInDb()
    const userId = users[0].id
    const blog = {
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 777,
      userId: userId
    }

    const response1 = await helper.blogsInDb()
    var blogs1 = []
    response1.map(b => (
      blogs1.push({
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes
      })))
    expect(blogs1).not.toContainEqual({
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 777
    })

    const sent = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blog).expect(200)
    const response2 = await helper.blogsInDb()
    var blogs2 = []
    response2.map(b => (
      blogs2.push({
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes
      })))

    expect(blogs2).toContainEqual({
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 777
    })
  })
  test('Defaults likes attribute to 0 if likes is undefined', async () => {

    const users = await helper.usersInDb()
    const userId = users[0].id
    const blog = {
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      userId: userId
    }

    const sent = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blog).expect(200)
    const response = await helper.blogsInDb()

    var blogs = []
    response.map(b => (
      blogs.push({
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes
      })))

    expect(blogs).toContainEqual({
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 0
    })
  })

  test('fails with proper status code 401 Unauthorized if token is not provided', async () => {

    const blog = {
      title: 'TOPIC',
      author: 'NAME',
      url: 'www.test.url',
      likes: 777,
    }

    const sent = await api.post('/api/blogs').send(blog).expect(401)

  })

  test('if title and url properties are missing from the request data, backend sends status code 400', async () => {

    const users = await helper.usersInDb()
    const blog = {
      author: 'NAME',
      likes: 777,
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blog).expect(400)


    expect(response.status).toBe(400)
  })
})

describe('deletion of a blog', () => {
  beforeEach(async () => {

    await User.deleteMany({})
    // add user for logins
    const initUser = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(initUser)
      .expect(200)

    //login before request
    const logCred = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    }
    const logRes = await api.post('/api/login').send(logCred).expect(200)

    token = logRes.body.token

    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blogObject).expect(200)

  })
  test('succeeds with status code 204 if id is valid', async () => {

    const start = await helper.blogsInDb()
    const blog = start[0]

    expect(start).toContainEqual(blog)
    const delResponse = await api.delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `bearer ${token}`).expect(204)
    const afterDel = await helper.blogsInDb()

    expect(afterDel.length).toBe(start.length - 1)
    expect(afterDel).not.toContainEqual(blog)
  })
})

describe('updating information of a blog', () => {
  beforeEach(async () => {

    await User.deleteMany({})
    // add user for logins
    const initUser = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(initUser)
      .expect(200)

    //login before request
    const logCred = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    }
    const logRes = await api.post('/api/login').send(logCred).expect(200)

    token = logRes.body.token

    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`).send(blogObject).expect(200)

  })
  test('successfully modifies a single blog', async () => {

    const start = await helper.blogsInDb()

    const blog = start[0]
    var modifiedBlog = {
      author: 'new',
      title: 'fullstackopen',
      url: 'fullstackopen.com',
      likes: 10000,
      id: blog.id,
      user: blog.user
    }
    expect(start).toContainEqual(blog)
    expect(start).not.toContainEqual(modifiedBlog)
    const putResponse = await api.put(`/api/blogs/${blog.id}`).set('Authorization', `bearer ${token}`).send(modifiedBlog).expect(204)
    const afterDel = await helper.blogsInDb()

    expect(afterDel.length).toBe(start.length)
    expect(afterDel).toContainEqual(modifiedBlog)
    expect(afterDel).not.toContainEqual(blog)
  })
})
afterAll(() => {
  mongoose.connection.close()
})