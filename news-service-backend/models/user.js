const config = require('../utils/config')
const mongoose = require('mongoose')


var MONGODB_URI = config.MONGODB_URI

if (config.NODE_ENV === 'test') {
  MONGODB_URI = config.TEST_MONGODB_URI
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
  userEmail: String,
  categories: [],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)