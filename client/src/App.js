// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import LeadManagement from './pages/leads/LeadManagement';
import InteractionHistory from './pages/interaction/InteractionHistory';
import LeadNotes from './pages/leadnotes/LeadNotes';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/lead-management" element={<LeadManagement />} />
        <Route path="/interaction-history" element={<InteractionHistory />} />
        <Route path="/lead-notes" element={<LeadNotes />} />
      </Routes>
    </Router>
  );
};

export default App;
