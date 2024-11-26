import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);
        console.log("Connected wallet address:", address);

        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        alert("Please install a compatible wallet like MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Connect Your Wallet</h1>
      <button
        onClick={connectWallet}
        className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600"
      >
        Connect Wallet
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
