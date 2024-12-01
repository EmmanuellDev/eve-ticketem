import Web3 from "web3";
import abi from "./abi/ABI.json";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x813415e5C40d7F4BDa449E1da80C900156449b70";

// Initialize Web3 provider
export const initializeWeb3 = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum); // Initialize Web3 with the provider from MetaMask
      const accounts = await web3.eth.getAccounts(); // Get the accounts from MetaMask
      return { web3, account: accounts[0] }; // Return the web3 instance and the first account
    } catch (error) {
      console.error("Error connecting to Ethereum:", error);
      throw error;
    }
  } else {
    alert("Please install MetaMask!");
    throw new Error("Ethereum provider not found.");
  }
};

// Store Hackathon Data
export const storeHackathonData = async (formData) => {
  try {
    const { web3, account } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS, {
      from: account,
    });

    console.log(
      formData.hackathonName,
      formData.tagline,
      formData.description,
      formData.website,
      formData.email,
      formData.twitter,
      formData.linkedin,
      formData.discord,
      formData.telegram,
      formData.instagram
    );

    // Sending transaction to store the data
    const tx = await contract.methods
      .storeLinks(
        formData.hackathonName,
        formData.tagline,
        formData.description,
        formData.website,
        formData.email,
        formData.twitter,
        formData.linkedin,
        formData.discord,
        formData.telegram,
        formData.instagram
      )
      .send({ from: account });

    // Wait for transaction to be mined
    await web3.eth.getTransactionReceipt(tx.transactionHash); // Wait for the transaction to be confirmed
    alert("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
    alert("Failed to store data. Please try again.");
  }
};

// Retrieve All Stored Hackathon Data for the Current User
export const getHackathonData = async () => {
  try {
    const { web3, account } = await initializeWeb3();
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    // Fetch the stored data for the current user's address
    const userData = await contract.methods.getLinks(account).call();

    // Return all fields of the HackData struct
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
