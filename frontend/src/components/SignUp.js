import React, { useState } from 'react';
import { signup } from '../services/api';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;