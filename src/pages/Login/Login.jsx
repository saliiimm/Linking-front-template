// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, setError } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Add your styles here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        {
          email,
          password,
        }
      );
      dispatch(setCredentials({ token: response.data.token }));
      console.log('done', response.data);
      navigate('/');
    } catch (error) {
      dispatch(setError(error.response.data.message || 'Login failed'));
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
