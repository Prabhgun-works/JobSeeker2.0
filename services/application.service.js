// services/application.service.js
//
// Business logic around applications (apply, list, status updates).

const applicationRepo = require('../repositories/applicationRepository');
const jobRepo = require('../repositories/jobRepository');
const userRepo = require('../repositories/userRepository');


async function applyToJob({ jobId, candidateId, resumePath }) {


  // Basic checks
  const job = await jobRepo.findById(jobId);

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }


  const candidate = await userRepo.findById(candidateId);

  if (!candidate || candidate.role !== 'candidate') {
    const err = new Error('Only candidates can apply');
    err.status = 403;
    throw err;
  }


  // Create application record
  const application = {
    job_id: jobId,
    candidate_id: candidateId,
    resume_path: resumePath,
    status: 'applied'
  };


  const created = await applicationRepo.create(application);


  return created;
}


async function getApplicationsByCandidate(candidateId) {
  return applicationRepo.findByCandidate(candidateId);
}


async function updateStatus(recruiterId, applicationId, status) {


  // Validate recruiter owns the job for this application
  const app = await applicationRepo.findById(applicationId);

  if (!app) {
    const err = new Error('Application not found');
    err.status = 404;
    throw err;
  }


  const job = await jobRepo.findById(app.job_id);

  if (!job || job.posted_by !== recruiterId) {
    const err = new Error('Forbidden: cannot update this application');
    err.status = 403;
    throw err;
  }


  const updated = await applicationRepo.updateStatus(applicationId, status);

  return updated;
}


module.exports = { applyToJob, getApplicationsByCandidate, updateStatus };
