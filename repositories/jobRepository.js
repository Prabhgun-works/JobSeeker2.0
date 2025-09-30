// repositories/jobRepository.js
//
// Job table access.

const db = require('./db');


async function findAll() {
  if (!db || !db.select) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  return db('jobs').select('*').orderBy('created_at', 'desc');
}


async function findById(id) {
  if (!db || !db.select) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  return db('jobs').where({ id }).first();
}


async function create(job) {
  if (!db || !db.insert) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  const rows = await db('jobs').insert(job).returning('*');
  return rows[0];
}


async function update(id, payload) {
  if (!db || !db.update) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  const rows = await db('jobs').where({ id }).update(payload).returning('*');
  return rows[0];
}


async function deleteJob(id) {
  if (!db || !db.del) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  return db('jobs').where({ id }).del();
}


module.exports = { findAll, findById, create, update, delete: deleteJob };
