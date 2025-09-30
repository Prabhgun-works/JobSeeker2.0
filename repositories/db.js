// repositories/db.js
//
// Knex instance. If DATABASE_URL not provided, functions that rely on DB
// should fail loudly so you know to configure the environment.

const knex = require('knex');
const config = require('../config/config');

if (!config.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL not configured. Repository methods will fail until DB is configured.');
}

const db = knex({
  client: 'pg',
  connection: config.DATABASE_URL || {},
  pool: { min: 0, max: 7 }
});

module.exports = db;
