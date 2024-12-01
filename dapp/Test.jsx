import React, { useState } from 'react';
import { STOREDATA } from '../src/contract/integration'; // Import your STOREDATA function

const HackathonForm = () => {
  const [formData, setFormData] = useState({
    HackathonName: '',
    Tagline: '',
    Description: '',
    website: '',
    email: '',
    twitter: '',
    linkedin: '',
    discord: '',
    telegram: '',
    instagram: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const txHash = await STOREDATA(formData); // Call STOREDATA function
      if (txHash) {
        alert(`Transaction Successful! Hash: ${txHash}`);
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="HackathonName"
        placeholder="Hackathon Name"
        value={formData.HackathonName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Tagline"
        placeholder="Tagline"
        value={formData.Tagline}
        onChange={handleChange}
        required
      />
      <textarea
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="url"
        name="website"
        placeholder="Website URL"
        value={formData.website}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="twitter"
        placeholder="Twitter"
        value={formData.twitter}
        onChange={handleChange}
      />
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        value={formData.linkedin}
        onChange={handleChange}
      />
      <input
        type="text"
        name="discord"
        placeholder="Discord"
        value={formData.discord}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telegram"
        placeholder="Telegram"
        value={formData.telegram}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instagram"
        placeholder="Instagram"
        value={formData.instagram}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HackathonForm;
