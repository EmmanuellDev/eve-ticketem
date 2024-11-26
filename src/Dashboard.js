import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Navigation</h2>
        <ul>
          <li className="py-2 hover:bg-gray-700 px-2 rounded-md">
            <a href="/">Home</a>
          </li>
          <li className="py-2 hover:bg-gray-700 px-2 rounded-md">
            <a href="/services">Services</a>
          </li>
          <li className="py-2 hover:bg-gray-700 px-2 rounded-md">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-100 flex items-center justify-between p-4 shadow-md">
          <h1 className="text-xl font-bold">Devma</h1>
          <button
            onClick={() => navigate("/profile")}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
          >
            Profile
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
          <p className="mt-4 text-gray-700">Here is your main dashboard content...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
