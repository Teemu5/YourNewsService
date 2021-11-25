const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'testuser1',
    name: 'test us1',
    password: 'passtest1'
  },
  {
    username: 'root2',
    name: 'Superuser2',
    password: 'salainen2',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
  {
    title: 'testtitle',
    author: 'testauthor',
    url: 'www.test.com',
    likes: 123
  },
  {
    title: 'search',
    author: 'google',
    url: 'www.google.com',
    likes: 77
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'soon',
    author: 'to',
    url: 'beremoved',
    likes: 342
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
}