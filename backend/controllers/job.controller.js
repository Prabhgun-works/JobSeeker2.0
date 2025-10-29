const jobRepo = require('../repositories/jobRepository');
const { ok } = require('../utils/response');
async function listJobs(req, res, next) { try { const jobs = await jobRepo.findAll(); return ok(res, jobs, 'Jobs fetched'); } catch (err) { next(err); } }
async function viewJob(req, res, next) { try { const id = req.params.id; const job = await jobRepo.findById(id); return ok(res, job, 'Job fetched'); } catch (err) { next(err); } }
async function createJob(req, res, next) { console.log(req.user, req.body); try { const { title, description, company, location } = req.body; if (!title || !description || !company || !location) { const err = new Error('Missing required fields'); err.status = 400; throw err; } const payload = { title, description, company, location, recruiterId: req.user.id }; const job = await jobRepo.create(payload); return res.status(201).json({ message: 'Job created', data: job }); } catch (err) { console.error('Error in createJob:', err); next(err); } }
module.exports = { listJobs, viewJob, createJob };
