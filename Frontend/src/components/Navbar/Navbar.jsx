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
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <div className="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                width="16"
                height="16"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            DocCollab
          </div>

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
                  className="profile-icon"
                  title="View Profile"
                  onClick={handleProfileClick}
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                  <span className="profile-online-dot" />
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="btn-login" onClick={openLogin}>
                  Sign In
                </button>
                <button className="btn-register" onClick={openRegister}>
                  Get Started
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
