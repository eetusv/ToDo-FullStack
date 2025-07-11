require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI
const SESSION_SECRET = process.env.SESSION_SECRET

module.exports = {
    PORT,
    MONGO_URI,
    SESSION_SECRET
}