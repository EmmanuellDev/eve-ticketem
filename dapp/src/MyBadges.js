import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function MyBadges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      const badgesRef = ref(database, `badges/`);
      const snapshot = await get(badgesRef);
      if (snapshot.exists()) {
        setBadges(Object.values(snapshot.val()));
      } else {
        setBadges([]);
      }
      setLoading(false);
    };

    fetchBadges();
  }, []);

  if (loading) {
    return <p>Loading badges...</p>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">My Badges</h2>
      {badges.length === 0 ? (
        <p>No Badges Available</p>
      ) : (
        <ul>
          {badges.map((badge, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{badge.name}</h3>
              <p>{badge.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBadges;
