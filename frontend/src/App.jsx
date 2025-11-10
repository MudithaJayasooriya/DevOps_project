import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Log_in";
import Signup from "./pages/Sign_up";
import AddYourHome from "./pages/AddYourHome";
import PropertyDetail from "./components/PropertyDetail";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";

function AppLayout() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/log_in" element={<Login />} />

          <Route
            path="/add_your_home"
            element={
              <PrivateRoute>
                <AddYourHome />
              </PrivateRoute>
            }
          />

          {user?.role === "admin" && (
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          )}
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
