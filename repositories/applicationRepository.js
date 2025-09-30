// repositories/applicationRepository.js
//
// Applications table access.

const db = require('./db');


async function create(application) {
  if (!db || !db.insert) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  const rows = await db('applications').insert(application).returning('*');
  return rows[0];
}


async function findByCandidate(candidateId) {
  if (!db || !db.select) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  return db('applications').where({ candidate_id: candidateId }).orderBy('applied_at', 'desc');
}


async function findById(id) {
  if (!db || !db.select) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  return db('applications').where({ id }).first();
}


async function updateStatus(id, status) {
  if (!db || !db.update) {
    throw new Error('DB not configured. Set DATABASE_URL in .env before using repositories.');
  }

  const rows = await db('applications').where({ id }).update({ status }).returning('*');
  return rows[0];
}


module.exports = { create, findByCandidate, findById, updateStatus };
