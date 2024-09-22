import React, { useState, useEffect } from "react";
import axios from "axios";
import { Puff } from "react-loader-spinner";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = () => {
    axios
      .get(
        "https://leaderboard-backend-rpmg.onrender.com/api/users/leaderboard"
      )
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching leaderboard:", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-md w-full bg-[#E7E4D3] rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-[#206BA4] text-center">
        Leaderboard
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <Puff color="#727B84" />
        </div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-[#206BA4]">Rank</th>
              <th className="border px-4 py-2 text-[#206BA4]">Name</th>
              <th className="border px-4 py-2 text-[#206BA4]">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-[#BBD9EE]">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{user.name}</td>
                <td className="border px-4 py-2 text-center">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
