import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function MyHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      const hackathonsRef = ref(database, `hackathons/`);
      const snapshot = await get(hackathonsRef);
      if (snapshot.exists()) {
        setHackathons(Object.values(snapshot.val()));
      } else {
        setHackathons([]);
      }
      setLoading(false);
    };

    fetchHackathons();
  }, []);

  if (loading) {
    return <p>Loading hackathons...</p>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">My Hackathons</h2>
      {hackathons.length === 0 ? (
        <p>No Hackathons Available</p>
      ) : (
        <ul>
          {hackathons.map((hackathon, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{hackathon.name}</h3>
              <p>{hackathon.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyHackathons;
