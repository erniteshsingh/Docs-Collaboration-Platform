import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">DocCollab</h2>
          <p className="footer-text">
            A real-time collaborative document platform where teams can
            create, edit and manage documents together.
          </p>
        </div>

        <div className="footer-section">
          <h3>Platform</h3>
          <Link to="/">Home</Link>
          <Link to="/documents">Documents</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} DocCollab. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;