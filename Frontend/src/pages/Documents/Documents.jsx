import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Documents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/documents",
        { withCredentials: true },
      );
      setDocuments(response.data.documents);
    } catch (error) {
      console.log("Error fetching documents", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/documents/${id}`, {
        withCredentials: true,
      });

      // remove from UI instantly
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  return (
    <div className="documents-page">
      <div className="documents-container">
        <div className="documents-header">
          <h1>Your Documents</h1>
          <button
            className="create-doc-btn"
            onClick={() => navigate("/documents/create")}
          >
            + Create Document
          </button>
        </div>

        <div className="documents-grid">
          {documents.length === 0 ? (
            <p>No documents yet</p>
          ) : (
            documents.map((doc) => (
              <div className="document-card" key={doc._id}>
                <h3>{doc.title}</h3>

                <p>{doc.content}...</p>

                <small>
                  Updated: {new Date(doc.updatedAt).toLocaleDateString()}
                </small>

                <div className="doc-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/documents/${doc._id}`)}
                  >
                    Edit
                  </button>

                  <button className="share-btn">Share</button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
