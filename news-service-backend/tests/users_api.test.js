const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


describe('when there is initially one user in db', () => {

  beforeEach(async () => {

    await User.deleteMany({})
    const userObject = new User({
      username: 'root2',
      name: 'Superuser2',
      password: 'salainen2',
    })
    userObject.save()
  })


  test('creation succeeds with a fresh username', async () => {


    let response = await api.get('/api/users')
    const usersAtStart = response.body
    const newUser = {
      username: 'user123',
      name: 'user 123',
      password: 'pass123',
    }
    let usernames = usersAtStart.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    response = await api.get('/api/users')
    const usersAtEnd = response.body

    usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'root2',
      name: 'Superuser2',
      password: 'salainen2',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique')

  })
})
afterAll(() => {
  mongoose.connection.close()
})