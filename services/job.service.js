// services/job.service.js
//
// Business rules for jobs. Keeps controllers thin.

const jobRepo = require('../repositories/jobRepository');
const userRepo = require('../repositories/userRepository');


async function listJobs(query) {
  // For now: return all jobs. Add pagination/filters later.
  return jobRepo.findAll();
}


async function getJobById(id) {
  const job = await jobRepo.findById(id);

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }

  return job;
}


async function createJob(recruiterId, payload) {


  // Ensure recruiter exists and is recruiter role
  const recruiter = await userRepo.findById(recruiterId);

  if (!recruiter || recruiter.role !== 'recruiter') {
    const err = new Error('Unauthorized: must be recruiter to post jobs');
    err.status = 403;
    throw err;
  }


  const job = {
    title: payload.title,
    description: payload.description,
    company: payload.company,
    location: payload.location,
    job_type: payload.job_type || 'full_time',
    posted_by: recruiterId
  };


  const created = await jobRepo.create(job);

  return created;
}


async function updateJob(recruiterId, jobId, payload) {


  const job = await jobRepo.findById(jobId);

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }


  if (job.posted_by !== recruiterId) {
    const err = new Error('Forbidden: you do not own this job');
    err.status = 403;
    throw err;
  }


  const updated = await jobRepo.update(jobId, payload);

  return updated;
}


async function deleteJob(recruiterId, jobId) {


  const job = await jobRepo.findById(jobId);

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }


  if (job.posted_by !== recruiterId) {
    const err = new Error('Forbidden: you do not own this job');
    err.status = 403;
    throw err;
  }


  await jobRepo.delete(jobId);


  return;
}


module.exports = { listJobs, getJobById, createJob, updateJob, deleteJob };
