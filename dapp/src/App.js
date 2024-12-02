import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import DevMaHomePage from "./HomePage"
import Login from "./Login";
import HackathonForm from "./HackathonForm";
import RealDash from "./RealDash"
import MyProjects from "./MyProjects";
import MyCertificates from "./MyCertificates";
import MyBadges from "./MyBadges";
import MyEvents from "./MyEvents";
import MyHackathons from "./MyHackathons";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevMaHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathon-form" element={<HackathonForm />} />
        <Route path="/real" element={<RealDash />}/>
        <Route path="/projects" element={<MyProjects/>}/>
        <Route path="/certificates" element={<MyCertificates/>}/>
        <Route path="/badges" element={<MyBadges/>}/>
        <Route path="/events" element={<MyEvents />} />
        <Route path="/hackathons" element={<MyHackathons />} />
      </Routes>
    </Router>
  );
}

export default App;
