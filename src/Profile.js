import React, { useState } from "react";
import { database, ref, set } from "./firebase";  // Ensure you have Firebase methods imported

const Profile = ({ walletAddress }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    location: "",
    skills: "",
    hobbies: "",
    bio: "",
    captcha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("No wallet connected. Please connect your wallet first.");
      return;
    }

    try {
      // Create a reference to the user's data in the database
      const userRef = ref(database, `users/${walletAddress}`);
      console.log("Saving data to Firebase...");

      // Save the data to Firebase Realtime Database
      await set(userRef, {
        walletAddress,
        ...formData,  // Form data fields
      });

      alert("Data saved successfully!");

      // Reset form data
      setFormData({
        username: "",
        email: "",
        mobile: "",
        location: "",
        skills: "",
        hobbies: "",
        bio: "",
        captcha: "",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Profile Information</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter your location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
            <input
              id="skills"
              type="text"
              placeholder="Enter your skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">Hobbies</label>
            <input
              id="hobbies"
              type="text"
              placeholder="Enter your hobbies"
              value={formData.hobbies}
              onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            placeholder="Write a short bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">Captcha</label>
          <input
            id="captcha"
            type="text"
            placeholder="Enter captcha"
            value={formData.captcha}
            onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-6 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
