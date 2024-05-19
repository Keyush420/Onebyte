import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './adminComponent/adminLogin';
import AdminDashboard from './adminComponent/AdminDashboard';
import AdminMenu from './adminComponent/adminMenu';
import AdminTable from './adminComponent/adminTable';
import UserDashboard from './userComponent/Dashboard/userDashboard'
import UserLogin from './userComponent/Login/userLogin'
import UserAbout from './userComponent/About/userAbout'
import UserGallery from './userComponent/Gallery/userGallery'
import UserContact from './userComponent/Contact/userContact'
import UserMenu from './userComponent/Menu/userMenu'
import UserRegister from './userComponent/Register/userRegister'
import UserTable from './userComponent/Table/userTable'
import UserProfile from './userComponent/Profile/userProfile'
import AdminReport from './adminComponent/adminReport'
import AdminOrder from './adminComponent/adminOrder'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminMenu" element={<AdminMenu />} />
        <Route path="/adminTable" element={<AdminTable />} />
        <Route path="/adminReport" element={<AdminReport />} />
        <Route path="/adminOrder" element={<AdminOrder />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/userMenu" element={<UserMenu />} />
        <Route path="/userAbout" element={<UserAbout />} />
        <Route path="/userGallery" element={<UserGallery />} />
        <Route path="/userContact" element={<UserContact />} />
        <Route path="/userTable" element={<UserTable />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
