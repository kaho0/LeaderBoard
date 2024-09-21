import React, { useState } from 'react';
import UserSelection from './components/userselection';
import Leaderboard from './components/leaderboard';

const App = () => {
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  // Toggle the refresh state to trigger leaderboard update
  const handlePointsClaimed = () => {
    setRefreshLeaderboard(prevState => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">User Leaderboard App</h1>
      <div className="flex flex-row justify-between items-center space-y-6 ">
        <UserSelection onPointsClaimed={handlePointsClaimed} />
        <Leaderboard key={refreshLeaderboard} />
      </div>
    </div>
  );
};

export default App;
