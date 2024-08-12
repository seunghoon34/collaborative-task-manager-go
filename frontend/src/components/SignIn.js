import React, { useState } from 'react';
import { signin } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/todos');
    } catch (error) {
      alert('Signin failed: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;