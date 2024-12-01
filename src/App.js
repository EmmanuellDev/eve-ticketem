import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Organize from "./Organize";
import DevMaHomePage from "./HomePage"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevMaHomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organize" element={<Organize />} />
      </Routes>
    </Router>
  );
}

export default App;
