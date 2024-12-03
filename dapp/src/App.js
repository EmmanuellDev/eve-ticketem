import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DevMaHomePage from "./pages/HomePage"
import Login from "./pages/Login";
import HackathonForm from "./pages/HackathonForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevMaHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathon-form" element={<HackathonForm />} />
      </Routes>
    </Router>
  );
}

export default App;
