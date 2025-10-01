// src/pages/Auth/Login.jsx
//
// Simple login form. Uses AuthContext.login to authenticate.

import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
// import './Auth.css';


export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);


  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);

    try {
      
      await login(email, password);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      setErr(err.response?.data?.message || 'Login failed');
    }
  }


  return (
    <div className="auth-container">
      <h2>Login</h2>

      {err && <div className="alert error">{err}</div>}
      
      <form onSubmit={onSubmit} className="auth-form">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit" className="btn">Login</button>

        <div className="muted">Don't have an account? <a href="/register">Register</a></div>
      </form>
    </div>
  );
}
