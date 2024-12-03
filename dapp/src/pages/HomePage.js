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
        setWalletAddress(address);
        console.log("Connected wallet address:", address);
        navigate("/login");
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
            setWalletAddress(accounts[0]);
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
    <div>
      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex"
      >
        <div className="flex-[6] flex flex-col justify-center items-center relative">
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
              <div className="group relative bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 transform hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
                <Rocket className="mx-auto mb-4 text-blue-400 group-hover:animate-bounce" size={48} />
                <h3 className="text-lg font-semibold mb-2">Hackathons</h3>
              </div>

              <div className="group relative bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 transform hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
                <Code className="mx-auto mb-4 text-green-400 group-hover:animate-spin" size={48} />
                <h3 className="text-lg font-semibold mb-2">Coding Events</h3>
              </div>

              <div className="group relative bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 transform hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
                <Users className="mx-auto mb-4 text-purple-400 group-hover:animate-bounce" size={48} />
                <h3 className="text-lg font-semibold mb-2">Networking</h3>
              </div>

              <div className="group relative bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-purple-600 border-opacity-30 transform hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
                <Trophy className="mx-auto mb-4 text-yellow-400 group-hover:animate-bounce" size={48} />
                <h3 className="text-lg font-semibold mb-2">Competitions</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                onClick={connectWallet}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition duration-700 blur-md"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Wallet size={24} />
                  {walletAddress ? "Connected" : ""}
                </span>
              </button>

              {walletAddress && (
                <div className="mt-4 text-sm text-gray-400 truncate text-center">
                 
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-[4] flex justify-start items-start relative duration-0">
          <iframe
            src="https://lottie.host/embed/8a5d3bd7-3997-4d40-9c65-53b8a075e0cd/K3BROBW30C.lottie"
            className="w-full h-[700px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DevMaHomePage;