const bcrypt = require('bcrypt');
async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}
async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
module.exports = { hashPassword, verifyPassword };
