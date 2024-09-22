import React, { useState } from "react";
import UserSelection from "./components/userselection";
import Leaderboard from "./components/leaderboard";

const App = () => {
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  const handlePointsClaimed = () => {
    setRefreshLeaderboard((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-[#EBF4FA] p-6">
      <h1 className="text-4xl font-bold text-center mb-6 font-rancho text-[#206BA4]">
        User Leaderboard App
      </h1>
      {/* Flex container with reduced gap */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8 space-y-6 lg:space-y-0">
        <UserSelection onPointsClaimed={handlePointsClaimed} />
        <Leaderboard key={refreshLeaderboard} />
      </div>
    </div>
  );
};

export default App;
