import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import DevMaHomePage from "./HomePage"
import Login from "./Login";
import HackathonForm from "./HackathonForm";


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
