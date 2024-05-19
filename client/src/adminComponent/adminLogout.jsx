// adminComponent/adminLogout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any necessary logout operations here, such as clearing tokens or session data
    // For example, clear local storage
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
