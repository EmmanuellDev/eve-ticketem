import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificatesRef = ref(database, `certificates/`);
      const snapshot = await get(certificatesRef);
      if (snapshot.exists()) {
        setCertificates(Object.values(snapshot.val()));
      } else {
        setCertificates([]);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <p>Loading certificates...</p>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">My Certificates</h2>
      {certificates.length === 0 ? (
        <p>No Certificates Available</p>
      ) : (
        <ul>
          {certificates.map((certificate, index) => (
            <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="font-semibold">{certificate.name}</h3>
              <p>{certificate.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCertificates;
