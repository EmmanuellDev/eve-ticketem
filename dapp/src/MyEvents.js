import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = ref(database, `events/`);
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        setEvents(Object.values(snapshot.val()));
      } else {
        setEvents([]);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>No Events Available</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{event.name}</h3>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEvents;
