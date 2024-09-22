import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";

const UserSelection = ({ onPointsClaimed }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://leaderboard-backend-rpmg.onrender.com/api/users/leaderboard"
      )
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleClaimPoints = () => {
    if (!selectedUser) return;

    axios
      .post(
        `https://leaderboard-backend-rpmg.onrender.com/api/users/claim/${selectedUser}`
      )
      .then((response) => {
        const { pointsAwarded } = response.data;
        setClaimedPoints(pointsAwarded);
        toast.success(`You claimed ${pointsAwarded} points!`, {
          style: {
            background: "#F1EFE2",
            color: "#206BA4",
            fontWeight: "bold",
          },
        });
        onPointsClaimed();
      })
      .catch((error) => console.log("Error claiming points:", error));
  };

  return (
    <div className="p-6 max-w-md w-full bg-[#C0C0C0] rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-[#206BA4] text-center">
        Select User to Claim Points
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <Puff color="#727B84" />
        </div>
      ) : (
        <>
          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleClaimPoints}
            className="mt-4 w-full px-6 py-2 bg-[#206BA4] text-white rounded hover:bg-[#BBD9EE] hover:opacity-80 transition"
          >
            Claim Points
          </button>
          {claimedPoints !== null && (
            <p className="mt-4 text-green-500">
              You claimed {claimedPoints} points for the selected user!
            </p>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserSelection;
