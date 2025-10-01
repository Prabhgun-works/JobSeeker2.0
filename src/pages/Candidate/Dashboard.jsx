// src/pages/Candidate/Dashboard.jsx
//
// Candidate dashboard: lists jobs and shows applied apps (basic).

import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import applicationService from '../../services/applicationService';


export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [err, setErr] = useState(null);


  useEffect(() => {
    fetchJobs();
    fetchApps();
  }, []);


  async function fetchJobs() {
    try {
      const res = await jobService.getJobs();
      setJobs(res.data.data);
    } catch (error) {
      setErr('Failed to load jobs');
    }
  }


  async function fetchApps() {
    try {
      const res = await applicationService.myApplications();
      setApps(res.data.data);
    } catch (error) {
      // ignore for now
    }
  }


  return (
    <div className="page-container">
      <h2>Jobs</h2>

      {err && <div className="alert error">{err}</div>}

      <div className="card-grid">
        {jobs.map((j) => (
          <div key={j.id} className="card">
            <h3>{j.title}</h3>
            <p className="muted">{j.company} • {j.location}</p>
            <p>{j.description?.slice(0, 200)}...</p>
            <a className="btn small" href={`/jobs/${j.id}`}>View / Apply</a>
          </div>
        ))}
      </div>

      <h3>Your applications</h3>

      <div>
        {apps.length === 0 && <div className="muted">You have not applied yet.</div>}
        {apps.map((a) => (
          <div key={a.id} className="mini-card">
            <strong>{a.job.title}</strong> — <span className="muted">{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
