import React, { useState } from 'react';
import { createTeam } from '../services/api';

function CreateTeam() {
    const [teamName, setTeamName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createTeam({ name: teamName });
            setMessage(`Team created successfully! Join Code: ${response.data.join_code}`);
            setTeamName('');
        } catch (error) {
            setMessage('Failed to create team. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create a New Team</h2>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    required
                />
                <button type="submit">Create Team</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateTeam;