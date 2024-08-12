import React, { useState } from 'react';
import { joinTeam } from '../services/api';

function JoinTeam() {
    const [joinCode, setJoinCode] = useState('');
    const [message, setMessage] = useState('');

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            await joinTeam(joinCode);
            setMessage('Successfully joined the team!');
            setJoinCode('');
        } catch (error) {
            setMessage('Failed to join team. Please check the join code.');
        }
    };

    return (
        <div>
            <h2>Join a Team</h2>
            <form onSubmit={handleJoin}>
                <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter team join code"
                    required
                />
                <button type="submit">Join Team</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default JoinTeam;