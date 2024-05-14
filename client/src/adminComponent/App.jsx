import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './adminLogin';
import AdminRegister from './adminRegister';
import Dashboard from './Dashboard';
import AdminMenu from './adminMenu';
import AdminTable from './adminTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<AdminTable />} />
        <Route path="/menu" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
