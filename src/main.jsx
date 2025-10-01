// src/main.jsx
//
// React entry. Mounts App and wraps with AuthContext provider.

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

const root = createRoot(document.getElementById('root'));

root.render(


  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>


);
