// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Login/Login';
// import Register from './Components/Register/Register';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Table from './Table';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/table" element={<Table />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Table from './Table';
import Menu from './Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<Table />} />
        <Route path="/menu" element={<Menu />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
