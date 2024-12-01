import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth from firebase.js
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                Join us to manage your medical needs online.
              </p>
              <button
                onClick={() => setIsSignup(false)}
                className="bg-transparent text-white px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign In
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
                <div className="mt-4 text-center">
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
                <div className="mt-4 text-center">
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
            <div className="w-1/2 bg-[#010305] flex flex-col justify-center items-center p-8 text-white">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 animate-pulse mb-6">
                Welcome Back!
              </h2>
              <p className="mb-4 text-lg text-white">
                Sign in to access your account and continue managing your
                health.
              </p>
              <button
                onClick={() => setIsSignup(true)}
                className="bg-transparent text-white px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Create Account
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
