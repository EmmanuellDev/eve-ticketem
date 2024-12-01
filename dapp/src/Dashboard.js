import React, { useState, useEffect } from "react";
import { getHackathonData } from "./integration"; // Import the function to get stored data

const Dashboard = () => {
  const [hackathonData, setHackathonData] = useState(null);

  useEffect(() => {
    const fetchHackathonData = async () => {
      try {
        const data = await getHackathonData();
        setHackathonData(data);
      } catch (error) {
        console.error("Error fetching hackathon data:", error);
        alert("Failed to fetch hackathon data.");
      }
    };

    fetchHackathonData();
  }, []);

  if (!hackathonData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hackathon Dashboard</h1>
        <p>Loading your hackathon data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hackathon Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Hackathon Information</h2>
        <p>
          <strong>Name:</strong> {hackathonData.hackathonName}
        </p>
        <p>
          <strong>Tagline:</strong> {hackathonData.tagline}
        </p>
        <p>
          <strong>Description:</strong> {hackathonData.description}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={hackathonData.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.website}
          </a>
        </p>
        <p>
          <strong>Email:</strong> {hackathonData.email}
        </p>
        <p>
          <strong>Twitter:</strong>{" "}
          <a
            href={hackathonData.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.twitter}
          </a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={hackathonData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.linkedin}
          </a>
        </p>
        <p>
          <strong>Discord:</strong>{" "}
          <a
            href={hackathonData.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.discord}
          </a>
        </p>
        <p>
          <strong>Telegram:</strong>{" "}
          <a
            href={hackathonData.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.telegram}
          </a>
        </p>
        <p>
          <strong>Instagram:</strong>{" "}
          <a
            href={hackathonData.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hackathonData.instagram}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
