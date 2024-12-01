import { providers, Contract } from 'ethers'; // Correct imports for v6
import ABI from './ABI.json';

const contractAddress = '0x24e010B9876c1e2D76fD7921B1CE6F92E17c5337';

// Function to check if Ethereum is available
const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new providers.Web3Provider(window.ethereum); // Use providers.Web3Provider
  } else {
    console.error("Ethereum provider not found.");
    return null;
  }
};

// Function to store hackathon data
export const STOREDATA = async ({
  HackathonName,
  Tagline,
  Description,
  website,
  email,
  twitter,
  linkedin,
  discord,
  telegram,
  instagram,
}) => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error("Ethereum provider not found.");

    // Request user to connect their wallet
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ABI, signer); // Use Contract from ethers

    const transaction = await contract.storeLinks(
      HackathonName,
      Tagline,
      Description,
      website,
      email,
      twitter,
      linkedin,
      discord,
      telegram,
      instagram
    );

    // Wait for the transaction to be mined
    await transaction.wait();

    alert("Data added successfully!");
    return transaction.hash;
  } catch (error) {
    console.error("Error adding data:", error);
    alert(`Error adding data: ${error.message}`);
    return null;
  }
};
