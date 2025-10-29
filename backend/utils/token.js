const jwt = require('jsonwebtoken');
const config = require('../config');
function signToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
}
module.exports = { signToken };
