import React, { useState, useEffect } from "react";
import { getAllHackathons, applyForHackathon } from "./integration"; // Adjust the path as needed

const Dashboard = () => {
  // States for hackathon data, application status, and errors
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [hackathonId, setHackathonId] = useState(""); // ID for applying to a hackathon

  // Fetch all hackathons on component mount
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await getAllHackathons(); // Using integration.js function to get all hackathons
        setHackathons(data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setError("Error fetching hackathons.");
      }
    };

    fetchHackathons();
  }, []);

  // Handle applying for a hackathon
  const handleApplyForHackathon = async () => {
    try {
      await applyForHackathon(hackathonId); // Using integration.js function to apply for a hackathon
      setMessage(`Successfully applied for hackathon ID: ${hackathonId}`);
    } catch (error) {
      setError(error.message || "Error applying for hackathon.");
      console.error(error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setHackathonId(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hackathon Dashboard</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <div className="text-green-500 mb-4">{message}</div>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">All Hackathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <div key={hackathon.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-lg font-semibold">{hackathon.name}</h3>
                <p>
                  <strong>Tagline:</strong> {hackathon.tagline}
                </p>
                <p>
                  <strong>Description:</strong> {hackathon.description}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={hackathon.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {hackathon.website}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong> {hackathon.email}
                </p>
              </div>
            ))
          ) : (
            <p>No hackathons available.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Apply for a Hackathon</h2>
        <input
          type="text"
          placeholder="Enter Hackathon ID"
          className="border p-2 w-full mb-2"
          value={hackathonId}
          onChange={handleInputChange}
        />
        <button
          className="bg-green-500 text-white p-2 mt-2"
          onClick={handleApplyForHackathon}
        >
          Apply for Hackathon
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
