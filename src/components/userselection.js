import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSelection = ({ onPointsClaimed }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [claimedPoints, setClaimedPoints] = useState(null);

    useEffect(() => {
        axios.get('https://leaderboard-backend-rpmg.onrender.com/api/users/leaderboard')
            .then(response => setUsers(response.data))
            .catch(error => console.log('Error fetching users:', error));
    }, []);

    const handleClaimPoints = () => {
        if (!selectedUser) return;

        axios.post(`https://leaderboard-backend-rpmg.onrender.com/api/users/claim/${selectedUser}`)
            .then(response => {
                const { pointsAwarded } = response.data;
                setClaimedPoints(pointsAwarded);
                onPointsClaimed();  
            })
            .catch(error => console.log('Error claiming points:', error));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Select User to Claim Points</h2>
            <select
                onChange={e => setSelectedUser(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Select a user</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button
                onClick={handleClaimPoints}
                className="mt-4 w-full px-6 py-2 bg-gray-500 text-black  rounded hover:bg-gray-600"
            >
                Claim Points
            </button>

            {claimedPoints !== null && (
                <p className="mt-4 text-green-500">You claimed {claimedPoints} points for the selected user!</p>
            )}
        </div>
    );
};

export default UserSelection;
