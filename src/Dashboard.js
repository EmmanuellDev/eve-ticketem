import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ChromePicker } from "react-color";
import {
  FaLock,
  FaGlobe,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedMainOption, setSelectedMainOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [activeSubSection, setActiveSubSection] = useState("Hack Info");
  const [selectedColors] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [color, setColor] = useState("#000fff");
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [timezone, setTimezone] = useState("UTC");
  const [applicationOpens, setApplicationOpens] = useState("");
  const [applicationEnds, setApplicationEnds] = useState("");
  const [hackathonBegins, setHackathonBegins] = useState("");
  const [projectSubmissionDeadline, setProjectSubmissionDeadline] =
    useState("");
  const [resultAnnouncementDate, setResultAnnouncementDate] = useState("");
  const [applicationEndsCountdown, setApplicationEndsCountdown] =
    useState(null);
  const [hackathonBeginsCountdown, setHackathonBeginsCountdown] =
    useState(null);
  const [projectSubmissionCountdown, setProjectSubmissionCountdown] =
    useState(null);
  const [resultAnnouncementCountdown, setResultAnnouncementCountdown] =
    useState(null);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorLogo, setSponsorLogo] = useState(null);
  const [additionalPrizes, setAdditionalPrizes] = useState([]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex); // Update the color with the hex value
  };

  const toggleColorPalette = () => {
    setShowColorPalette(!showColorPalette);
  };

  const handleDoneClick = () => {
    setShowColorPalette(false); // Close the color palette
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const timezones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Kolkata",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      // Only update countdowns if the date is set
      const now = new Date();

      if (applicationEnds) {
        const appEndsTime = new Date(applicationEnds);
        if (now >= appEndsTime && applicationEndsCountdown !== 0) {
          setApplicationEndsCountdown(0);
        } else if (
          now < appEndsTime &&
          applicationEndsCountdown !== appEndsTime - now
        ) {
          setApplicationEndsCountdown(appEndsTime - now);
        }
      }

      if (hackathonBegins && applicationEndsCountdown === 0) {
        const hackathonTime = new Date(hackathonBegins);
        if (now >= hackathonTime && hackathonBeginsCountdown !== 0) {
          setHackathonBeginsCountdown(0);
        } else if (
          now < hackathonTime &&
          hackathonBeginsCountdown !== hackathonTime - now
        ) {
          setHackathonBeginsCountdown(hackathonTime - now);
        }
      }

      if (projectSubmissionDeadline && hackathonBeginsCountdown === 0) {
        const projectDeadlineTime = new Date(projectSubmissionDeadline);
        if (now >= projectDeadlineTime && projectSubmissionCountdown !== 0) {
          setProjectSubmissionCountdown(0);
        } else if (
          now < projectDeadlineTime &&
          projectSubmissionCountdown !== projectDeadlineTime - now
        ) {
          setProjectSubmissionCountdown(projectDeadlineTime - now);
        }
      }

      if (resultAnnouncementDate && projectSubmissionCountdown === 0) {
        const resultDateTime = new Date(resultAnnouncementDate);
        if (now >= resultDateTime && resultAnnouncementCountdown !== 0) {
          setResultAnnouncementCountdown(0);
        } else if (
          now < resultDateTime &&
          resultAnnouncementCountdown !== resultDateTime - now
        ) {
          setResultAnnouncementCountdown(resultDateTime - now);
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  },[
    applicationEndsCountdown,
    hackathonBeginsCountdown,
    projectSubmissionCountdown,
    resultAnnouncementCountdown,
  ]);

  const formatCountdown = (timeRemaining) => {
    if (timeRemaining === null) return "N/A";
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSponsorLogo(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-700">
          Unauthorized Access
        </h1>
        <p className="mt-2 text-gray-600">
          Please connect your wallet to access the dashboard.
        </p>
      </div>
    );
  }

  const renderSubSectionContent = () => {
    return (
      <div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Hackathon Name
          </label>
          <input
            type="text"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter the Hackathon Name"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Tagline
          </label>
          <input
            type="text"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Asia's biggest hackathon"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full mb-4 p-1 border border-gray-300 rounded"
            placeholder="About this hackathon"
            rows="4"
          ></textarea>

          <label className="block mb-2 font-medium text-gray-700">Theme</label>
          <select className="w-full mb-4 p-2 border border-gray-300 rounded">
            <option value="" disabled selected>
              Select your Hack Theme
            </option>
            <option>Blockchain</option>
            <option>Design</option>
            <option>FinTech</option>
            <option>AI / ML</option>
            <option>HealthTech</option>
            <option>VR / AR</option>
            <option>Future Mobility</option>
            <option>IoT / Hardware</option>
            <option>Open Innovation (No restrictions)</option>
          </select>

          <input
            type="number"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter the number of participants"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Team Size
          </label>
          <input
            type="number"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter the team size (e.g., 1-5)"
          />

        </div>

        <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaGlobe className="mr-2" /> Hack Website Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://www.yourhackathonwebsite.com"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2" /> Contact Email
            </label>
            <input
              type="email"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="hackathon@example.com"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaTwitter className="mr-2" /> X (Twitter) Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://twitter.com/yourhackathon"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaLinkedin className="mr-2" /> LinkedIn Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://linkedin.com/in/yourhackathon"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaDiscord className="mr-2" /> Discord Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://discord.gg/yourhackathon"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaTelegramPlane className="mr-2" /> Telegram Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://t.me/yourhackathon"
            />

            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FaInstagram className="mr-2" /> Instagram Link
            </label>
            <input
              type="url"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="https://instagram.com/yourhackathon"
            />

        </div>

        <div>
            {/* Hack Logo Upload */}
            <label className="block mb-2 font-medium text-gray-700 mt-6">
              Hack Logo
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => handleFileChange(e, setLogoPreview)}
            />
            {logoPreview && (
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Logo Preview:</p>
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain mt-2"
                />
              </div>
            )}

        </div>

        <div>
            {/* Timezone Dropdown */}
            <label
              htmlFor="timezone"
              className="block font-medium text-gray-700"
            >
              Timezone:
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            >
              {timezones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            {/* Application Opens */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Application Opens (DD/MM/YYYY HH:MM):
              </label>
              <input
                type="datetime-local"
                value={applicationOpens}
                onChange={(e) => setApplicationOpens(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Application Ends */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Application Ends (DD/MM/YYYY HH:MM):
              </label>
              <input
                type="datetime-local"
                value={applicationEnds}
                onChange={(e) => setApplicationEnds(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-2">
                Countdown: {formatCountdown(applicationEndsCountdown)}
              </div>
            </div>

            {/* Hackathon Begins */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Hackathon Begins (DD/MM/YYYY HH:MM):
              </label>
              <input
                type="datetime-local"
                value={hackathonBegins}
                onChange={(e) => setHackathonBegins(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-2">
                Countdown: {formatCountdown(hackathonBeginsCountdown)}
              </div>
            </div>

            {/* Project Submission Deadline */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Project Submission Deadline (DD/MM/YYYY HH:MM):
              </label>
              <input
                type="datetime-local"
                value={projectSubmissionDeadline}
                onChange={(e) => setProjectSubmissionDeadline(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-2">
                Countdown: {formatCountdown(projectSubmissionCountdown)}
              </div>
            </div>

            {/* Result Announcement Date */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Result Announcement Date (DD/MM/YYYY HH:MM):
              </label>
              <input
                type="datetime-local"
                value={resultAnnouncementDate}
                onChange={(e) => setResultAnnouncementDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-2">
                Countdown: {formatCountdown(resultAnnouncementCountdown)}
              </div>
            </div>
        </div>
        
        <div className="p-4 border border-gray-300 rounded">
            <h2 className="text-2xl font-bold mb-4">Sponsor Details</h2>

            {/* Sponsor Organization's Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Sponsor Organization's Name
              </label>
              <input
                type="text"
                placeholder="Enter Sponsor Organization's Name"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Sponsor Organization's Logo */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Sponsor Organization's Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {sponsorLogo && (
                <div className="mt-2">
                  <p className="text-gray-700">Preview:</p>
                  <img
                    src={sponsorLogo}
                    alt="Sponsor Logo"
                    className="w-32 h-32 object-contain mt-2"
                  />
                </div>
              )}
            </div>
        </div>

      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Navigation Bar */}
      <div className="w-64 bg-teal-500 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Navigation</h2>
          <ul className="space-y-4">
            <li
              className="cursor-pointer hover:text-teal-300"
              onClick={() => setActiveSection("dashboard")}
            >
              My Hackathons
            </li>
            <li
              className="cursor-pointer hover:text-teal-300"
              onClick={() => setActiveSection("dashboard")}
            >
              My Events
            </li>
            <li
              className="cursor-pointer hover:text-teal-300"
              onClick={() => setActiveSection("dashboard")}
            >
              Projects
            </li>
            <li
              className="cursor-pointer hover:text-teal-300"
              onClick={() => setActiveSection("dashboard")}
            >
              Certificates
            </li>
            <li
              className="cursor-pointer hover:text-teal-300"
              onClick={() => setActiveSection("dashboard")}
            >
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
          <h2 className="text-lg font-bold text-gray-700">
            Welcome to Your Dashboard!
          </h2>
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
            <strong>Connected Wallet Address:</strong>{" "}
            <span className="text-teal-600">{walletAddress}</span>
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
                      selectedMainOption === "Hackathon"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    Hackathon
                  </button>
                  <button
                    onClick={() => setSelectedMainOption("Event")}
                    className={`${
                      selectedMainOption === "Event"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-teal-500"
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
                      selectedSubOption === "For Students"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-teal-500"
                    } px-4 py-2 rounded border border-teal-500`}
                  >
                    For Students
                  </button>
                  <button
                    onClick={() => setSelectedSubOption("For Communities")}
                    className={`${
                      selectedSubOption === "For Communities"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-teal-500"
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
                      "Dashboard",
                    ].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSubSection(section)}
                        className={`${
                          activeSubSection === section
                            ? "bg-teal-500 text-white"
                            : "bg-white text-teal-500"
                        } px-3 py-2 rounded`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {/* Render Selected Subsection Content */}
                  <div className="mt-6 bg-white p-6 shadow-md rounded">
                    {renderSubSectionContent()}
                  </div>
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