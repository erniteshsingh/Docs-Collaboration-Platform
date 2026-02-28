import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h2 className="navbar-logo">DocCollab</h2>

          <div className="navbar-center">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/documents" className="nav-link">
              Documents
            </Link>
          </div>

          <div className="navbar-right">
            {isAuthenticated ? (
              <div className="profile-section">
                <div
                  className="profile-icon clickable"
                  title="View Profile"
                  onClick={handleProfileClick}
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="btn-primary" onClick={openRegister}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Register
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        openLogin={openLogin}
      />

      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        openRegister={openRegister}
      />
    </>
  );
};

export default Navbar;
