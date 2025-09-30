// controllers/job.controller.js
//
// Job controllers: minimal, readable, and delegating to service layer.

const jobService = require('../services/job.service');
const { ok, created } = require('../utils/response');


async function listJobs(req, res, next) {
  try {
    const jobs = await jobService.listJobs(req.query);
    return ok(res, jobs, 'Jobs fetched');
  } catch (err) {
    return next(err);
  }
}


async function viewJob(req, res, next) {
  try {
    const id = req.params.id;
    const job = await jobService.getJobById(id);
    return ok(res, job, 'Job fetched');
  } catch (err) {
    return next(err);
  }
}


async function createJob(req, res, next) {
  try {
    const payload = req.body;

    // req.user is attached by authMiddleware
    const recruiterId = req.user.id;

    const job = await jobService.createJob(recruiterId, payload);

    return created(res, job, 'Job created');
  } catch (err) {
    return next(err);
  }
}


async function updateJob(req, res, next) {
  try {
    const id = req.params.id;
    const payload = req.body;
    const recruiterId = req.user.id;

    const job = await jobService.updateJob(recruiterId, id, payload);

    return ok(res, job, 'Job updated');
  } catch (err) {
    return next(err);
  }
}


async function deleteJob(req, res, next) {
  try {
    const id = req.params.id;
    const recruiterId = req.user.id;

    await jobService.deleteJob(recruiterId, id);

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}


module.exports = { listJobs, viewJob, createJob, updateJob, deleteJob };
