import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Organize from "./Organize";
import DevMaHomePage from "./HomePage"
import Login from "./Login";
import Test from "./Test";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevMaHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organize" element={<Organize />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
