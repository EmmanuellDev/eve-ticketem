import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRef = ref(database, `projects/`);
      const snapshot = await get(projectsRef);
      if (snapshot.exists()) {
        setProjects(Object.values(snapshot.val()));
      } else {
        setProjects([]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      {projects.length === 0 ? (
        <p>No Projects Approved/Uploaded Yet</p>
      ) : (
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyProjects;
