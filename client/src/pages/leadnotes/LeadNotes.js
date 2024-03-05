import React, { useState, useEffect } from 'react';
import './LeadNotes.css';
const LeadNotes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchLeadNotes();
    }, []);

    const fetchLeadNotes = () => {
        fetch('http://localhost:5000/lead_notes')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched lead notes data:', data);
                setNotes(data);
            })
            .catch(error => console.error('Error fetching lead notes:', error));
    };

    const handleCreateNote = () => {
        fetch('http://localhost:5000/lead_notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: newNote }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create lead note');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            setNewNote('');
            fetchLeadNotes();
        })
        .catch(error => console.error('Error creating lead note:', error));
    };

    const handleUpdateNote = (noteId, updatedNote) => {
        fetch(`http://localhost:5000/lead_notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: updatedNote }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update lead note');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fetchLeadNotes();
        })
        .catch(error => console.error('Error updating lead note:', error));
    };

    const handleDeleteNote = (noteId) => {
        fetch(`http://localhost:5000/lead_notes/${noteId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete lead note');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            fetchLeadNotes();
        })
        .catch(error => console.error('Error deleting lead note:', error));
    };

    return (
        <div>
            <h2>Lead Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note[0]}>
                        {note[2]}
                        <button onClick={() => handleUpdateNote(note[0], 'Updated note')}>
                            Update
                        </button>
                        <button onClick={() => handleDeleteNote(note[0])}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                ></textarea>
                <button onClick={handleCreateNote}>Add Note</button>
            </div>
        </div>
    );
};

export default LeadNotes;
