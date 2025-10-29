import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import CandidateDashboard from '../pages/Candidate/Dashboard';
import RecruiterDashboard from '../pages/Recruiter/Dashboard';
import NotFound from '../pages/NotFound';
import AuthContext from '../context/AuthContext';
function PrivateRoute({ children }) { const { state } = useContext(AuthContext); if(!state.user) return <Navigate to="/login" replace/>; return children; }
export default function AppRoutes(){ return (<BrowserRouter><Routes><Route path="/" element={<Navigate to="/dashboard" replace/>} /><Route path="/login" element={<Login/>} /><Route path="/register" element={<Register/>} /><Route path="/dashboard" element={<PrivateRoute><DashboardRouter/></PrivateRoute>} /><Route path="*" element={<NotFound/>} /></Routes></BrowserRouter>); }
function DashboardRouter(){ const { state } = useContext(AuthContext); if(!state.user) return null; if(state.user.role === 'recruiter') return <RecruiterDashboard/>; return <CandidateDashboard/>; }
