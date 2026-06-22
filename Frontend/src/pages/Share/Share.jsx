import { useState } from "react";
import { toast } from "react-toastify";
import "./Share.css";

import axios from "../../api/axios";
const Share = ({ docId, onClose }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("viewer");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `/api/v1/documents/${docId}/collaborators`,
        { email, permission },
        { withCredentials: true },
      );
      toast.success("Document shared successfully!");
      setEmail("");
      setPermission("viewer");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Share failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("share-overlay")) onClose();
  };

  return (
    <div className="share-overlay" onClick={handleOverlayClick}>
      <div className="share-modal">
        <button className="share-close-btn" onClick={onClose}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            width="15"
            height="15"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="share-header">
          <div className="share-logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              width="18"
              height="18"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <h2 className="share-title">Share Document</h2>
          <p className="share-subtitle">
            Invite someone to collaborate on this document.
          </p>
        </div>

        <div className="share-form">
          <div className="form-group">
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
            <input
              type="email"
              placeholder="Enter collaborator's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShare()}
            />
          </div>

          <div className="form-group">
            <label>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="13"
                height="13"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Permission Level
            </label>
            <div className="permission-toggle">
              <button
                type="button"
                className={`perm-btn ${permission === "viewer" ? "perm-active" : ""}`}
                onClick={() => setPermission("viewer")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Viewer
              </button>
              <button
                type="button"
                className={`perm-btn ${permission === "editor" ? "perm-active" : ""}`}
                onClick={() => setPermission("editor")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editor
              </button>
            </div>
          </div>
        </div>

        <div className="share-buttons">
          <button className="share-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="share-submit"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-inner">
                <span className="btn-spinner" />
                Sharing...
              </span>
            ) : (
              <span className="btn-inner">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  width="14"
                  height="14"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Share
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
