import React, { useState, useEffect } from 'react';
import './Users.css'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.21.171:5000/users');
        const data = await response.json();
        
        // Flatten the nested arrays and map them to objects
        const flattenedUsers = data.map(userArr => ({
          id: userArr[0],
          username: userArr[1],
          password: userArr[2],
          first_name: userArr[3],
          last_name: userArr[4],
          email: userArr[5],
          role: userArr[6],
          created_at: userArr[7]
        }));
        setUsers(flattenedUsers);
      } catch (error) {
        
      }
    };
  
    return (
      <div className="page-container">
        <h1>User Management</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserManagement;