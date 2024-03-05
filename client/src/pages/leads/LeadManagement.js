import React, { useState, useEffect } from 'react';
import './LeadManagement.css';

function LeadManagement() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await fetch('http://192.168.21.171:5000/leads');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setLeads(data); 
        } catch (error) {
         
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="leadManagementContainer">
            <h1>Lead Management</h1>
            <table className="leadsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, index) => (
                        <tr key={index}>
                            <td>{lead[0]}</td>
                            <td>{lead[1]}</td>
                            <td>{lead[2]}</td>
                            <td>{lead[3]}</td>
                            <td>
                               
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeadManagement;
