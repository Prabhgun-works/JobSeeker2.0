function ok(res, data, message = 'OK') {
  return res.json({ message, data });
}
function created(res, data, message = 'Created') {
  return res.status(201).json({ message, data });
}
module.exports = { ok, created };
