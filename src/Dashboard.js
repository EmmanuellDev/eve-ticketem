import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaLock } from "react-icons/fa";

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to 'dashboard'
  const [selectedMainOption, setSelectedMainOption] = useState(""); // Track main option (Hackathon/Event)
  const [selectedSubOption, setSelectedSubOption] = useState(""); // Track sub-option (For Students/Communities)
  const [activeSubSection, setActiveSubSection] = useState("Hack Info"); // Track selected subsection

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

  const renderSubSectionContent = () => {
    switch (activeSubSection) {
      case "Hack Info":
        return <p>Provide details about the Hackathon/Event.</p>;
      case "Application":
        return <p>Details regarding the application process.</p>;
      case "Social Links":
        return <p>Add social media links for your event.</p>;
      case "Brand":
        return <p>Include branding information and logos.</p>;
      case "Dates":
        return <p>Set important dates for the event.</p>;
      case "Sponsors":
        return <p>List sponsors and their details.</p>;
      case "Prizes":
        return <p>Describe prizes for the winners.</p>;
      case "Speakers & Judges":
        return <p>Add information about speakers and judges.</p>;
      case "FAQs":
        return <p>Provide answers to frequently asked questions.</p>;
      default:
        return <p>Select a section from the menu above.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Navigation Bar */}
      <div className="w-64 bg-teal-500 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Navigation</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-teal-300" onClick={() => setActiveSection("dashboard")}>
              My Hackathons
            </li>
            <li className="cursor-pointer hover:text-teal-300" onClick={() => setActiveSection("dashboard")}>
              My Events
            </li>
            <li className="cursor-pointer hover:text-teal-300" onClick={() => setActiveSection("dashboard")}>
              Projects
            </li>
            <li className="cursor-pointer hover:text-teal-300" onClick={() => setActiveSection("dashboard")}>
              Certificates
            </li>
            <li className="cursor-pointer hover:text-teal-300" onClick={() => setActiveSection("dashboard")}>
              Badges
            </li>
          </ul>
        </div>
        <button
          className="bg-white text-teal-500 font-bold px-4 py-2 rounded hover:bg-teal-400 hover:text-white"
          onClick={() => setActiveSection("organize")}
        >
          Organize Hack & Events
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">
          <h1 className="text-xl font-bold text-teal-500">Devlu</h1>
          <h2 className="text-lg font-bold text-gray-700">Welcome to Your Dashboard!</h2>
          <button
            onClick={() => alert("Redirecting to profile...")}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400"
          >
            Profile
          </button>
        </div>

        {/* Wallet Address */}
        <div className="p-4 bg-white shadow-md text-center">
          <p className="text-gray-700">
            <strong>Connected Wallet Address:</strong> <span className="text-teal-600">{walletAddress}</span>
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeSection === "organize" ? (
            <>
              {/* Main Options: Hackathon or Event */}
              {!selectedMainOption && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedMainOption("Hackathon")}
                    className={`${
                      selectedMainOption === "Hackathon" ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    Hackathon
                  </button>
                  <button
                    onClick={() => setSelectedMainOption("Event")}
                    className={`${
                      selectedMainOption === "Event" ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    Event
                  </button>
                </div>
              )}

              {/* Sub-Options: For Students/Communities */}
              {selectedMainOption && !selectedSubOption && (
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => setSelectedSubOption("For Students")}
                    className={`${
                      selectedSubOption === "For Students" ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    For Students
                  </button>
                  <button
                    onClick={() => setSelectedSubOption("For Communities")}
                    className={`${
                      selectedSubOption === "For Communities" ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    For Communities
                  </button>
                </div>
              )}

              {/* Horizontal Component Bar */}
              {selectedMainOption && selectedSubOption && (
                <>
                  <div className="flex mt-6 space-x-4 bg-teal-100 p-4 rounded">
                    {[
                      "Hack Info",
                      "Application",
                      "Social Links",
                      "Brand",
                      "Dates",
                      "Sponsors",
                      "Prizes",
                      "Speakers & Judges",
                      "FAQs",
                    ].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSubSection(section)}
                        className={`${
                          activeSubSection === section ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                        } px-3 py-2 rounded`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {/* Render Selected Subsection Content */}
                  <div className="mt-6 bg-white p-6 shadow-md rounded">{renderSubSectionContent()}</div>
                </>
              )}
            </>
          ) : (
            <div>Dashboard Content</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
