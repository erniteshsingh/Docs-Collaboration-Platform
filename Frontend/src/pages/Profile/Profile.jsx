import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import "./Profile.css";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        "/api/v1/users/update-profile",
        { username, email },
        { withCredentials: true },
      );
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(res.data.message || "Profile updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-bg-orb orb-1" />
      <div className="profile-bg-orb orb-2" />

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              {username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="avatar-online-dot" />
          </div>

          <div className="profile-header-info">
            <h2 className="profile-name">{username || "User"}</h2>
            <p className="profile-email">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width="13"
                height="13"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {email}
            </p>
            <div className="status-badge">
              <span className="status-dot" />
              Active Account
            </div>
          </div>
        </div>

        <div className="profile-divider">
          <span>Profile Information</span>
        </div>

        <div className="profile-body">
          <div className="profile-input-group">
            <label>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="13"
                height="13"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Username
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="profile-input-group">
            <label>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="13"
                height="13"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="btn btn-update"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-inner">
                <span className="btn-spinner" />
                Updating...
              </span>
            ) : (
              <span className="btn-inner">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  width="15"
                  height="15"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Update Profile
              </span>
            )}
          </button>

          <button
            className="btn btn-password"
            onClick={() => navigate("/update-password")}
          >
            <span className="btn-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                width="15"
                height="15"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Update Password
            </span>
          </button>

          <button className="btn btn-logout" onClick={handleLogout}>
            <span className="btn-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                width="15"
                height="15"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
