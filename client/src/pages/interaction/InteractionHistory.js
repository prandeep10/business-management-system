import React, { useState, useEffect } from 'react';
import './InteractionHistory.css';

function InteractionHistory() {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [setSelectedInteraction] = useState(null);
  const [editedSummary, setEditedSummary] = useState('');

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await fetch('http://192.168.21.171:5000/interaction');
      const data = await response.json();
      console.log('Fetched interaction data:', data);
      setInteractions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interaction history:', error);
    }
  };

  const deleteInteraction = async (interactionId) => {
    try {
      await fetch(`http://192.168.21.171:5000/interaction/${interactionId}`, {
        method: 'DELETE',
      });
      console.log('Interaction deleted successfully');
      // Fetch interactions again to update the list
      fetchInteractions();
    } catch (error) {
      console.error('Error deleting interaction:', error);
    }
  };

  const openEditPopup = (interaction) => {
    setSelectedInteraction(interaction);
    setEditedSummary(interaction[3]);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedInteraction(null);
    setEditedSummary('');
  };

  const updateInteraction = async (interaction) => {
    try {
      // Remove circular references from the interaction object
      const sanitizedInteraction = removeCircularReferences(interaction);
  
      // Extract the interaction id from the interaction object
      const interaction_id = sanitizedInteraction.id;
      
      const response = await fetch(`http://192.168.21.171:5000/interaction/${interaction_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedInteraction),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update interaction');
      }
  
      console.log('Interaction updated successfully');
      // Add any additional logic here, such as updating state or displaying a success message
    } catch (error) {
      console.error('Error updating interaction:', error.message);
      // Handle error gracefully, such as displaying an error message to the user
    }
  };
  
  const removeCircularReferences = (object) => {
    const seen = new WeakSet();
    const sanitizedObject = JSON.parse(JSON.stringify(object, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    }));
    return sanitizedObject;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="interactionHistoryContainer">
      <h1>Interaction History</h1>
      <table className="interactionsTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lead ID</th>
            <th>Type</th>
            <th>Summary</th>
            <th>Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction[0]}>
              <td>{interaction[0]}</td>
              <td>{interaction[1]}</td>
              <td>{interaction[2]}</td>
              <td>{interaction[3]}</td>
              <td>{interaction[4]}</td>
              <td>{interaction[5]}</td>
              <td>
                <button onClick={() => deleteInteraction(interaction[0])}>Delete</button>
                <button onClick={() => openEditPopup(interaction)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Interaction</h2>
            <textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
            ></textarea>
            <div className="button-group">
              <button onClick={updateInteraction}>Save</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractionHistory;
