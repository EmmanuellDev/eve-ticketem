import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth from firebase.js
import { FaLock } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add toastify styles

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(true); // Toggle between Signup and Login
  const [error, setError] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Function to check wallet connection
  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true); // Wallet is connected
        } else {
          setIsWalletConnected(false); // No wallet connected
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setIsWalletConnected(false);
      }
    } else {
      setIsWalletConnected(false); // Metamask not installed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("User created successfully!");
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        toast.success("Sign-in successful!");
      }
      setTimeout(() => navigate("/dashboard"), 2000); // Navigate to dashboard after success
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "Email is already in use.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/wrong-password": "Incorrect password.",
        "auth/user-not-found": "No user found with this email.",
      };
      const errorMessage =
        errorMessages[error.code] || "An unknown error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful!");
      setTimeout(() => navigate("/dashboard"), 2000); // Navigate to dashboard after success
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  if (!isWalletConnected) {
    // Unauthorized access message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <FaLock className="text-6xl text-red-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Unauthorized Access</h2>
        <p className="text-lg mb-6">
          Please connect your wallet to access this page.
        </p>
      </div>
    );
  }


  return (
    <div
      className={`flex min-h-screen justify-center items-center transition-all duration-700 ${
        isSignup
          ? "bg-gradient-to-r from-black to-gray-900"
          : "bg-gradient-to-r from-gray-900 to-black"
      }`}
    >
      <div className="relative w-full max-w-4xl h-[500px] bg-black shadow-lg rounded-md overflow-hidden flex">
        <div
          className={`absolute inset-0 transform transition-transform duration-700 ${
            isSignup ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex w-full h-full">
            <div className="w-1/2 bg-black flex flex-col justify-center items-center p-8 text-white">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse mb-6">
                Welcome to DevMa
              </h2>
              <p className="mb-4 text-lg text-white">
                Get more hacks & events
              </p>
              <button
                onClick={() => setIsSignup(false)}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition duration-700 blur-md"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Sign In
                </span>
              </button>
            </div>
            <div className="w-1/2 p-10 bg-black text-white">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse mb-6">
                  Create Account
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                  <label className="block mb-2 text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 bg-transparent text-white focus:border-[#00ff7f] focus:ring-2 focus:ring-[#00ff7f] transition-all duration-300 rounded"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 bg-transparent text-white focus:border-[#00ff7f] focus:ring-2 focus:ring-[#00ff7f] transition-all duration-300 rounded"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#007bff] text-white px-6 py-3 rounded-lg hover:bg-[#0056b3] transition-all duration-300"
                >
                  Create Account
                </button>
                <h2 className="flex justify-center pt-4">( Or )</h2>
                <div className="mt-1 text-center">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Sign Up with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sliding content for Sign In */}
        <div
          className={`absolute inset-0 transform transition-transform duration-700 ${
            isSignup ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex w-full h-full">
            <div className="w-1/2 p-10 bg-black text-white">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse mb-6">
                  Sign In
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                  <label className="block mb-2 text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 bg-transparent text-white focus:border-[#007bff] focus:ring-2 focus:ring-[#007bff] transition-all duration-300 rounded"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-600 bg-transparent text-white focus:border-[#007bff] focus:ring-2 focus:ring-[#007bff] transition-all duration-300 rounded"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#007bff] text-white px-6 py-3 rounded-lg hover:bg-[#0056b3] transition-all duration-300"
                >
                  Sign In
                </button>
                <h6 className="flex justify-center pt-4">( Or )</h6>
                <div className="mt-1 text-center">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    
                    Sign In with Google
                  </button>
                  
                </div>
              </form>
            </div>
            <div className="w-1/2 bg-[#000000] flex flex-col justify-center items-center p-8 text-white">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse mb-6">
                Welcome Back!
              </h2>
              <p className="mb-4 text-lg text-white flex text-center">
                Want to dive into the world of excitement? Then Make an Account Now!
              </p>
              <button
                onClick={() => setIsSignup(true)}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition duration-700 blur-md"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Create Account
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;