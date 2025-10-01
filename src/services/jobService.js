// src/services/jobService.js
//
// Job-related API calls.

import apiClient from '../api/apiClient';


const jobService = {


  getJobs: () => apiClient.get('/jobs'),


  getJob: (id) => apiClient.get(`/jobs/${id}`),


  createJob: (data) => apiClient.post('/jobs', data),


  updateJob: (id, data) => apiClient.put(`/jobs/${id}`, data),


  deleteJob: (id) => apiClient.delete(`/jobs/${id}`)


};


export default jobService;
