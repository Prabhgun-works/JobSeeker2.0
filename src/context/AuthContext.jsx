// src/context/AuthContext.jsx
//
// Minimal AuthContext using localStorage for token persistence.

import React, { createContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';


const initialState = {
  user: null,
  token: null,
  loading: true
};


const AuthContext = createContext(initialState);


function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
    case 'LOGOUT':
      return { user: null, token: null, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
}


export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    // On mount, attempt to load token/user from localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch({ type: 'LOGIN', payload: { token, user: JSON.parse(user) } });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);


  async function login(email, password) {
    const res = await authService.login({ email, password });
    const { token, user } = res.data.data;

    // store minimal info in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({ type: 'LOGIN', payload: { token, user } });

    return res;
  }


  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }


  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
