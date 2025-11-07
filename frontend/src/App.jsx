import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Log_in";
import Signup from "./pages/Sign_up";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/log_in" element={<Login />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
