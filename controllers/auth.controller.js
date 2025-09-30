// controllers/auth.controller.js
//
// Auth controller: thin layer. Keeps responses consistent and delegates logic to service.

const authService = require('../services/auth.service');
const { created } = require('../utils/response');


async function register(req, res, next) {
  try {

    const payload = req.body;

    const user = await authService.register(payload);

    // Don't return password/hash in response.
    return created(res, { user }, 'User registered');


  } catch (err) {
    return next(err);
  }
}


async function login(req, res, next) {
  try {

    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    return res.status(200).json(result);


  } catch (err) {
    return next(err);
  }
}


module.exports = { register, login };
