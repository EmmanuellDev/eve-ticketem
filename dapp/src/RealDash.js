import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { ref, get, update } from "firebase/database";
import { auth, database } from "./firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage
import { onAuthStateChanged } from "firebase/auth";
import logo from "./img/WhatsApp Image 2024-12-02 at 04.56.45_4c48ea0e.jpg";
import MyHackathons from "./MyHackathons";
import MyEvents from "./MyEvents";
import MyProjects from "./MyProjects";
import MyCertificates from "./MyCertificates";
import MyBadges from "./MyBadges";
import dp from "./img/image.png"

function Dashboard() {
  const [user, setUser] = useState(null); // Authenticated user
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeMenu, setActiveMenu] = useState("myHackathons"); // State for active menu item
  const storage = getStorage(); // Initialize Firebase Storage
  
  const defaultUserIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-16 w-16 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 18a8.25 8.25 0 0115 0"
      />
    </svg>
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  

  // Fetch user data from Realtime Database
  const fetchUserData = async (uid) => {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      setUserData(snapshot.val());
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Handle file selection for profile picture
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload profile picture to Firebase Storage and update user data
  const uploadProfilePicture = async () => {
    if (selectedFile) {
      const storagePath = storageRef(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storagePath, selectedFile);

      const downloadURL = await getDownloadURL(storagePath);
      await update(ref(database, `users/${user.uid}`), { profilePicture: downloadURL });

      setUserData({ ...userData, profilePicture: downloadURL });
      setSelectedFile(null);
    }
  };

  // Update user profile data in Firebase
  const updateUserData = async () => {
    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, editedData);
    setUserData({ ...userData, ...editedData });
    setIsEditing(false); // Exit edit mode
    uploadProfilePicture(); // Upload profile picture if file is selected
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <p className="text-2xl">Unauthorized Access. Please log in.</p>
      </div>
    );
  }

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "myHackathons":
        return <div>
            <MyHackathons />
        </div>;
      case "myEvents":
        return <div>
            <MyEvents />
        </div>;
      case "myProjects":
        return <div>
            <MyProjects />
        </div>;
      case "myCertificates":
        return <div>
            <MyCertificates />
        </div>;
      case "myBadges":
        return <div>
            <MyBadges />
        </div>;
      default:
        return <div>Overview of User Activities</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6">
        <div className="mb-8">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
            <h1 className="text-xl font-bold">DevMa</h1>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                <img
                  src={dp}
                  alt="Profile"
                  className="object-cover h-full w-full" />
                </div>
            <div className="ml-4">
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-semibold">{userData.username || "Username"}</h2>
                  <p className="text-sm">{userData.firstName || "First Name"}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    defaultValue={userData.username}
                    onChange={handleInputChange}
                    className="text-black mb-2 p-1 rounded"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    defaultValue={userData.firstName}
                    onChange={handleInputChange}
                    className="text-black p-1 rounded"
                  />
                  <input type="file" onChange={handleFileChange} />
                </>
              )}
            </div>
            <button
              className="ml-auto text-xl text-gray-300"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <FaEdit />
            </button>
          </div>
          {isEditing && (
            <button
              className="mt-4 bg-white text-teal-500 py-1 px-4 rounded"
              onClick={updateUserData}
            >
              Update
            </button>
          )}
        </div>

        <nav>
          <ul>
            <li className="mb-4">
              <button onClick={() => setActiveMenu("myHackathons")}>My Hackathons</button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveMenu("myEvents")}>My Events</button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveMenu("myProjects")}>My Projects</button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveMenu("myCertificates")}>My Certificates</button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveMenu("myBadges")}>My Badges</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold border-b-4 border-teal-500 pb-2">
          Overview of User Activities
        </h2>

        {/* Content Based on Active Menu */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
