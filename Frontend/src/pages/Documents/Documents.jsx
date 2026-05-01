import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Share from "../Share/Share";

const Documents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/v1/documents", {
        withCredentials: true,
      });
      setDocuments(res.data.documents || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this document?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/documents/${id}`, {
        withCredentials: true,
      });
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch {}
  };

  if (loading) return <div className="loader">Loading Documents...</div>;

  return (
    <div className="documents-page">
      <div className="documents-container">
        <header className="documents-header">
          <div className="header-text">
            <h1>My Documents</h1>
            <p>{documents.length} items</p>
          </div>

          <button
            className="create-doc-btn"
            onClick={() => navigate("/documents/create")}
          >
            + New Document
          </button>
        </header>

        <div className="documents-grid">
          {documents.length === 0 ? (
            <div className="no-docs">No documents found</div>
          ) : (
            documents.map((doc) => {
              const currentUserId = user?.id;
              const docOwnerId = doc.owner?._id || doc.owner;

              const isOwner =
                docOwnerId?.toString() === currentUserId?.toString();

              const collabInfo = doc.collaborators?.find(
                (c) =>
                  (c.user?._id || c.user)?.toString() ===
                  currentUserId?.toString(),
              );

              const role = isOwner ? "owner" : collabInfo?.role || "viewer";

              return (
                <div className="document-card" key={doc._id}>
                  <div className="card-top">
                    <span className={`role-tag ${role}`}>{role}</span>
                    <h3 className="doc-title">{doc.title}</h3>
                  </div>

                  <p className="card-body">
                    {doc.content
                      ? doc.content.substring(0, 90) + "..."
                      : "No content"}
                  </p>

                  <div className="card-footer">
                    <div className="date-text">
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </div>

                    <div className="action-buttons">
                      <button
                        className="btn edit-btn"
                        onClick={() =>
                          navigate(`/documents/${doc._id}`, {
                            state: { role },
                          })
                        }
                      >
                        {role === "viewer" ? "View" : "Edit"}
                      </button>

                      {isOwner && (
                        <>
                          <button
                            className="btn share-btn"
                            onClick={() => {
                              setCurrentDocId(doc._id);
                              setIsShareOpen(true);
                            }}
                          >
                            Share
                          </button>

                          <button
                            className="btn delete-btn"
                            onClick={(e) => handleDelete(e, doc._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isShareOpen && (
        <Share docId={currentDocId} onClose={() => setIsShareOpen(false)} />
      )}
    </div>
  );
};

export default Documents;
