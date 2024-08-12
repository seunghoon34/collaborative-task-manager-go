import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;