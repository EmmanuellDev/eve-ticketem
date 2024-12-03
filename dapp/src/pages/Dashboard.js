import React, { useState, useEffect } from "react";
import { getAllHackathons, applyForHackathon } from "../integration"; // Adjust the path as needed

const Dashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [hackathonId, setHackathonId] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await getAllHackathons();
        setHackathons(data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setError("");
      }
    };
    fetchHackathons();
  }, []);

  const handleApplyForHackathon = async () => {
    try {
      await applyForHackathon(hackathonId);
      setMessage(`Successfully applied for hackathon ID: ${hackathonId}`);
      setError(null);
    } catch (error) {
      setError(error.message || "Error applying for hackathon.");
      console.error(error);
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setHackathonId(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-500">Hackathon Dashboard</h1>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {message && <div className="text-green-500 mb-1 text-center">{message}</div>}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-500 mb-6 text-center">All Hackathons</h2>
        <div className="grid grid-cols-1   md:grid-cols-1 gap-8">
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="relative bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-teal-600 transform hover:scale-105 transition-transform duration-500 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-teal-400 mb-2">{hackathon.name}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Tagline:</strong> {hackathon.tagline}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Description:</strong> {hackathon.description}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Website:</strong>{" "}
                  <a
                    href={hackathon.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 underline hover:text-teal-500"
                  >
                    {hackathon.website}
                  </a>
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Email:</strong> {hackathon.email}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center  text-gray-400">No hackathons available.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-teal-500 text-center mb-6">Apply for a Hackathon</h2>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Hackathon ID"
            className="border border-teal-500 bg-gray-900 text-white p-3 rounded-lg w-full max-w-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={hackathonId}
            onChange={handleInputChange}
          />
          <button
            className="relative group overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:from-teal-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
            onClick={handleApplyForHackathon}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-700 blur-md"></div>
            <span className="relative z-10">Apply for Hackathon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
