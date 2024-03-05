import React, { useState, useEffect } from 'react';
import './Dashboard.css'

const Dashboard = () => {
  const [leadsCount, setLeadsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    // Fetch data from API when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch leads count
      const leadsResponse = await fetch('http://192.168.21.171:5000/leads');
      const leadsData = await leadsResponse.json();
      const leadsCount = leadsData.length;
      setLeadsCount(leadsCount);

      // Fetch users count
      const usersResponse = await fetch('http://192.168.21.171:5000/users');
      const usersData = await usersResponse.json();
      const usersCount = usersData.length;
      setUsersCount(usersCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-item">
          <h2>Leads</h2>
          <p>Total Leads: {leadsCount}</p>
        </div>
        <div className="summary-item">
          <h2>Users</h2>
          <p>Total Users: {usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
