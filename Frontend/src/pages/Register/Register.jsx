import { useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

const Register = ({ isOpen, onClose, openLogin }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      onClose();
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("register-overlay")) {
      onClose();
    }
  };

  const handleLoginClick = () => {
    onClose();
    openLogin && openLogin();
  };

  return (
    <div className="register-overlay" onClick={handleOverlayClick}>
      <div className="register-card">
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>

        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join DocCollab</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="register-btn" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <span onClick={handleLoginClick}> Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
