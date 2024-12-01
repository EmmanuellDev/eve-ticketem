import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";
import { Rocket, Code, Users, Trophy, Wallet } from "lucide-react";

const DevMaHomePage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address); // Ensure this is a string
        console.log("Connected wallet address:", address);

        navigate("/dashboard");
      } else {
        alert("Please install a compatible wallet like MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error.message || error);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]); // Ensure this is a string
            console.log("Wallet already connected:", accounts[0]);
          }
        }
      } catch (error) {
        console.error(
          "Error checking wallet connection:",
          error.message || error
        );
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"></div>

      <div className="relative z-10 text-center p-8 max-w-4xl">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse">
          Welcome to DevMa
        </h1>

        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Connect, Compete, and Create at the Intersection of Innovation and
          Technology
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 hover:bg-opacity-70 transition-all">
            <Rocket className="mx-auto mb-4 text-blue-400" size={48} />
            <h3 className="text-lg font-semibold mb-2">Hackathons</h3>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 hover:bg-opacity-70 transition-all">
            <Code className="mx-auto mb-4 text-green-400" size={48} />
            <h3 className="text-lg font-semibold mb-2">Coding Events</h3>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 hover:bg-opacity-70 transition-all">
            <Users className="mx-auto mb-4 text-purple-400" size={48} />
            <h3 className="text-lg font-semibold mb-2">Networking</h3>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 hover:bg-opacity-70 transition-all">
            <Trophy className="mx-auto mb-4 text-yellow-400" size={48} />
            <h3 className="text-lg font-semibold mb-2">Competitions</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={connectWallet}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
          >
            <Wallet size={24} />
            {walletAddress ? "Connected" : "Connect Wallet"}
          </button>

          {walletAddress && (
            <div className="mt-4 text-sm text-gray-400 truncate text-center">
              {`Connected: ${walletAddress}`}
            </div>
          )}
        </div>

        <div className="absolute -bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default DevMaHomePage;
