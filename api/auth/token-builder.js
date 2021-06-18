// jsonwebtoken
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../secrets/index')

module.exports = function (user) { // Create a token payload containing the user's id and username
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign( // Create a token with the payload
    payload,
    JWT_SECRET,
    options,
  )
}
