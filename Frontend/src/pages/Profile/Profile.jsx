import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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
        "http://localhost:5000/api/v1/users/update-profile",
        {
          username,
          email,
        },
        {
          withCredentials: true,
        },
      );

      const updatedUser = res.data.user;

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(res.data.message || "Profile updated successfully");

      // Reload to reflect updated data everywhere
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
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="profile-name">{username || "User"}</h2>

            <p className="profile-email">{email}</p>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-input-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="profile-input-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="profile-row">
            <span>Account Status</span>

            <strong className="status-active">Active</strong>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="btn btn-update"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
