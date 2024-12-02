import Web3 from "web3";
import abi from "./abi/ABI.json";

const CONTRACT_ADDRESS = "0xE7713b03d4Dec1122Ff75C90748aa4Da7e5Cd3A9"; // Replace with your smart contract address

// Initialize web3 and the contract
export const initializeWeb3 = async () => {
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      return { web3, account };
    } else {
      throw new Error("Ethereum wallet not found.");
    }
  } catch (error) {
    console.error("Error initializing web3:", error);
    throw error;
  }
};

// Store hackathon data for the user
export const storeHackathonData = async (hackathonData) => {
  try {
    const { web3, account } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    await contract.methods
      .storeLinks(
        hackathonData.hackathonName,
        hackathonData.tagline,
        hackathonData.description,
        hackathonData.website,
        hackathonData.email,
        hackathonData.twitter,
        hackathonData.linkedin,
        hackathonData.discord,
        hackathonData.telegram,
        hackathonData.instagram
      )
      .send({ from: account });

    console.log("Hackathon data stored successfully!");
  } catch (error) {
    console.error("Error storing hackathon data:", error);
    throw error;
  }
};

// Retrieve hackathon data for the user
export const getHackathonData = async () => {
  try {
    const { web3, account } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    const userData = await contract.methods.getLinks(account).call();

    return {
      hackathonName: userData.HackathonName,
      tagline: userData.Tagline,
      description: userData.Description,
      website: userData.website,
      email: userData.email,
      twitter: userData.twitter,
      linkedin: userData.linkedin,
      discord: userData.discord,
      telegram: userData.telegram,
      instagram: userData.instagram,
    };
  } catch (error) {
    console.error("Error fetching hackathon data:", error);
    throw error;
  }
};

// Apply for a specific hackathon
export const applyForHackathon = async (hackathonId) => {
  try {
    const { web3, account } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    // Check if the user has already applied
    const hasApplied = await contract.methods.hasApplied(account).call();
    if (hasApplied) {
      throw new Error("You have already applied for this hackathon.");
    }

    // Check if the hackathon has reached its application limit (max 10 members)
    const applicationCount = await contract.methods
      .getApplicationCount()
      .call();
    if (applicationCount >= 10) {
      throw new Error("Application limit reached for this hackathon.");
    }

    // Apply for the hackathon
    await contract.methods.applyForHackathon().send({ from: account });

    console.log(`Successfully applied for hackathon ID: ${hackathonId}`);
  } catch (error) {
    console.error("Error applying for hackathon:", error);
    throw error;
  }
};

// Get all hackathons
export const getAllHackathons = async () => {
  try {
    const { web3 } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    const hackathonCount = await contract.methods.getHackathonCount().call(); // Assuming getHackathonCount() returns the number of hackathons
    const hackathons = [];

    for (let i = 0; i < hackathonCount; i++) {
      const hackathon = await contract.methods.getHackathon(i).call(); // Assuming getHackathon(i) returns details of a hackathon
      hackathons.push({
        id: hackathon.hackathonId,
        name: hackathon.name,
        tagline: hackathon.tagline,
        description: hackathon.description,
      });
    }

    return hackathons;
  } catch (error) {
    console.error("Error fetching all hackathons:", error);
    throw error;
  }
};
