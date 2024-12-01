import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Organize = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsAuthorized(true);
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
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Unauthorized Access</h1>
        <p className="mt-2 text-gray-600">
          Please connect your wallet to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-teal-500 mb-6">
        Organize Your Own
      </h1>
      {!selectedOption && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedOption("hackathon")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            Organize Your Own Hackathon
          </button>
          <button
            onClick={() => setSelectedOption("event")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            Organize Your Own Event
          </button>
        </div>
      )}

      {selectedOption === "hackathon" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Hackathon Options
          </h2>
          <button
            onClick={() => alert("For Students option clicked")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            For Students
          </button>
          <button
            onClick={() => alert("For Communities option clicked")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            For Communities
          </button>
          <button
            onClick={() => setSelectedOption(null)}
            className="w-64 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      )}

      {selectedOption === "event" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Event Options
          </h2>
          <button
            onClick={() => alert("For Students option clicked")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            For Students
          </button>
          <button
            onClick={() => alert("For Communities option clicked")}
            className="w-64 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-400"
          >
            For Communities
          </button>
          <button
            onClick={() => setSelectedOption(null)}
            className="w-64 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Organize;
