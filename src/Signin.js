import React from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setWalletAddress }) => {
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask or another Ethereum wallet!');
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]); // Save wallet address
      navigate('/profile'); // Redirect to Profile page
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default SignIn;
