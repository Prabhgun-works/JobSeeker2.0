const authService = require('../services/auth.service');
async function register(req, res, next) { try { const result = await authService.register(req.body); res.json({ message: 'User registered', data: result }); } catch (err) { next(err); } }
async function login(req, res, next) { try { const result = await authService.login(req.body); res.json({ message: 'Login successful', data: result }); } catch (err) { next(err); } }
module.exports = { register, login };
