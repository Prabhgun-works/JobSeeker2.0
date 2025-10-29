const userRepo = require('../repositories/userRepository');
const { hashPassword, verifyPassword } = require('../utils/hash');
const { signToken } = require('../utils/token');
async function register(payload) {
  if (!payload.email || !payload.password || !payload.name) { const err = new Error('Missing required fields'); err.status = 400; throw err; }
  const existing = await userRepo.findByEmail(payload.email);
  if (existing) { const err = new Error('Email already in use'); err.status = 409; throw err; }
  const hashed = await hashPassword(payload.password);
  const created = await userRepo.create({ name: payload.name, email: payload.email, password: hashed, role: payload.role || 'candidate' });
  const safeUser = { id: created.id, name: created.name, email: created.email, role: created.role, createdAt: created.createdAt };
  const token = signToken({ id: created.id, email: created.email, role: created.role });
  return { user: safeUser, token };
}
async function login({ email, password }) {
  if (!email || !password) { const err = new Error('Email and password required'); err.status = 400; throw err; }
  const user = await userRepo.findByEmail(email);
  if (!user) { const err = new Error('Invalid credentials'); err.status = 401; throw err; }
  const ok = await verifyPassword(password, user.password);
  if (!ok) { const err = new Error('Invalid credentials'); err.status = 401; throw err; }
  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user: safeUser, token };
}
module.exports = { register, login };
