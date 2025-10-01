// src/services/applicationService.js
//
// Application related API calls.

import apiClient from '../api/apiClient';


const applicationService = {


  applyToJob: (jobId, formData) => apiClient.post(`/applications/${jobId}/apply`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),


  myApplications: () => apiClient.get('/applications/me'),


  updateStatus: (id, data) => apiClient.put(`/applications/${id}/status`, data)


};


export default applicationService;
