import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Share.css";

const Share = ({ docId, onClose }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("viewer");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!email) return alert("Enter email");

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/v1/documents/${docId}/collaborators`,
        { email, permission },
        { withCredentials: true },
      );

      toast.success("Your document shared ssuccecfully! ");

      setEmail("");
      setPermission("viewer");
      onClose();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Share Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-modal">
        <h2>Share Document</h2>

        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        >
          <option value="viewer">viewer</option>
          <option value="editor">editor</option>
        </select>

        <div className="share-buttons">
          <button
            className="share-submit"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "Sharing..." : "Share"}
          </button>

          <button className="share-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
