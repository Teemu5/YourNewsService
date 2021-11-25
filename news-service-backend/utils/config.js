require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
let NODE_ENV = process.env.NODE_ENV
module.exports = {
  MONGODB_URI,
  PORT,
  TEST_MONGODB_URI,
  NODE_ENV
}