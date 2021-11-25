const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {

  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    // Connect selected categories to user email
    const users = new User({
      categories: body.categories,
      userEmail: body.userEmail,
    })

    const savedUserCategories = await users.save()

    response.json(savedUserCategories)

  } catch (e) {
    next(e)
  }
})

usersRouter.put('/:id', async (request, response) => {
  const b = request.body
  const user = {
    categories: b.categories,
    userEmail: b.userEmail
  }
  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  return response.status(200).json(updatedUser.toJSON())
})

module.exports = usersRouter