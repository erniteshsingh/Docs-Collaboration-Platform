import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/update-profile"); 
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="profile-name">{user?.username || "User"}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-row">
            <span>Username</span>
            <strong>{user?.username}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-row">
            <span>Account Status</span>
            <strong className="status-active">Active</strong>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-update" onClick={handleUpdateProfile}>
            Update Profile
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
