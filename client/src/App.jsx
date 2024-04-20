import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Menu from './Menu';
import Reservation from './Reservation';
import ReservationPage from './ReservationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/ReservationPage" element={<ReservationPage />} />
        <Route path="/menu" element={<Menu />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
