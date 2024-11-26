import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaLock } from "react-icons/fa";

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []); // Request wallet connection
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsAuthorized(true); // Allow access if wallet is connected
          } else {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        setIsAuthorized(false);
      }
    };

    checkWalletConnection();
  }, []);

  if (!isAuthorized) {
    // Show unauthorized access message
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <FaLock className="text-6xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700">Unauthorized Access</h1>
        <p className="mt-2 text-gray-600">
          Please connect your wallet to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Navigation Bar */}
      <div className="w-64 bg-teal-500 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Navigation</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-teal-300">My Hackathons</li>
            <li className="cursor-pointer hover:text-teal-300">My Events</li>
            <li className="cursor-pointer hover:text-teal-300">Projects</li>
            <li className="cursor-pointer hover:text-teal-300">Certificates</li>
            <li className="cursor-pointer hover:text-teal-300">Badges</li>
          </ul>
        </div>
        <button
          className="bg-white text-teal-500 font-bold px-4 py-2 rounded hover:bg-teal-400 hover:text-white"
          onClick={() => alert("Redirecting to Organize page...")}
        >
          Organize Hack & Events
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">
          <h1 className="text-xl font-bold text-teal-500">Devlu</h1>
          <button
            onClick={() => alert("Redirecting to profile...")}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400"
          >
            Profile
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-700">Welcome to Your Dashboard!</h2>
          <p className="mt-2 text-gray-600">Connected Wallet Address:</p>
          <div className="mt-4 bg-white shadow-md p-4 rounded text-gray-700">
            <code className="text-teal-600">{walletAddress}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
