// src/pages/Recruiter/Dashboard.jsx
//
// Recruiter dashboard: list jobs, create/update/delete, view applicants.

import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import applicationService from '../../services/applicationService';


export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', company: '', location: '' });
  const [err, setErr] = useState(null);


  useEffect(() => {
    fetchJobs();
  }, []);


  async function fetchJobs() {
    try {
      const res = await jobService.getJobs();
      setJobs(res.data.data);
    } catch (error) {
      setErr('Failed to load jobs');
    }
  }


  async function onCreate(e) {
    e.preventDefault();
    try {
      await jobService.createJob(form);
      setForm({ title: '', description: '', company: '', location: '' });
      fetchJobs();
    } catch (error) {
      setErr('Failed to create job');
    }
  }


  async function onDelete(id) {
    try {
      await jobService.deleteJob(id);
      fetchJobs();
    } catch (error) {
      setErr('Delete failed');
    }
  }


  async function onSelect(job) {
    setSelectedJob(job);
    setForm({ title: job.title, description: job.description, company: job.company, location: job.location });
  }


  async function onUpdate(e) {
    e.preventDefault();
    try {
      await jobService.updateJob(selectedJob.id, form);
      setSelectedJob(null);
      setForm({ title: '', description: '', company: '', location: '' });
      fetchJobs();
    } catch (error) {
      setErr('Update failed');
    }
  }


  async function viewApplicants(jobId) {
    try {
      const res = await applicationService.getApplicantsForJob?.(jobId);
      // For now, backend doesn't have a dedicated endpoint; if included, implement.
      console.log('applicants', res?.data);
    } catch (e) {
      console.log('no applicants endpoint');
    }
  }


  return (
    <div className="page-container">
      <h2>Recruiter — Jobs</h2>

      {err && <div className="alert error">{err}</div>}

      <form className="card form" onSubmit={selectedJob ? onUpdate : onCreate}>
        <label>Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label>Company</label>
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />

        <label>Location</label>
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />

        <label>Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <div style={{ marginTop: 12 }}>
          <button className="btn" type="submit">{selectedJob ? 'Update' : 'Create'}</button>
          {selectedJob && <button type="button" className="btn muted" onClick={() => setSelectedJob(null)}>Cancel</button>}
        </div>
      </form>

      <div className="list">
        {jobs.map((j) => (
          <div key={j.id} className="list-item">
            <div>
              <strong>{j.title}</strong> <span className="muted">— {j.company}</span>
            </div>
            <div>
              <button className="btn small" onClick={() => onSelect(j)}>Edit</button>
              <button className="btn small danger" onClick={() => onDelete(j.id)}>Delete</button>
              <button className="btn small" onClick={() => viewApplicants(j.id)}>Applicants</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
