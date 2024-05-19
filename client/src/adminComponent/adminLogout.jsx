import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/adminLogin');
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default AdminLogout;
