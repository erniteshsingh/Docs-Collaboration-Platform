import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents.css";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

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
      const res = await axios.get("/api/v1/documents", {
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
      await axios.delete(`/api/v1/documents/${id}`, {
        withCredentials: true,
      });
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch {}
  };

  if (loading)
    return (
      <div className="loader-page">
        <div className="loader-card">
          <div className="loader-spinner" />
          <p>Loading your documents…</p>
        </div>
      </div>
    );

  return (
    <div className="documents-page">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <div className="documents-container">
        <header className="documents-header">
          <div className="header-left">
            <div className="header-eyebrow">
              <span className="eyebrow-dot" />
              Your Workspace
            </div>
            <h1>
              My <span className="gradient-text">Documents</span>
            </h1>
            <p className="doc-count">
              {documents.length}{" "}
              {documents.length === 1 ? "document" : "documents"} in your
              library
            </p>
          </div>

          <button
            className="create-doc-btn"
            onClick={() => navigate("/documents/create")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              width="15"
              height="15"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Document
          </button>
        </header>

        <div className="documents-grid">
          {documents.length === 0 ? (
            <div className="no-docs">
              <div className="no-docs-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="40"
                  height="40"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h3>No documents yet</h3>
              <p>Create your first document to get started.</p>
              <button
                className="no-docs-cta"
                onClick={() => navigate("/documents/create")}
              >
                Create Document
              </button>
            </div>
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
                  <div className={`card-accent-bar accent-${role}`} />

                  <div className="card-body-section">
                    <div className="card-top">
                      <span className={`role-tag role-${role}`}>{role}</span>
                      <h3 className="doc-title">{doc.title}</h3>
                    </div>

                    <p className="card-preview">
                      {doc.content
                        ? doc.content.substring(0, 100) + "…"
                        : "No content yet."}
                    </p>
                  </div>

                  <div className="card-footer">
                    <div className="footer-meta">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        width="13"
                        height="13"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="action-buttons">
                      <button
                        className={`btn ${role === "viewer" ? "btn-view" : "btn-edit"}`}
                        onClick={() => navigate(`/documents/${doc._id}`)}
                      >
                        {role === "viewer" ? (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="12"
                              height="12"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View
                          </>
                        ) : (
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="12"
                              height="12"
                            >
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </>
                        )}
                      </button>

                      {isOwner && (
                        <>
                          <button
                            className="btn btn-share"
                            onClick={() => {
                              setCurrentDocId(doc._id);
                              setIsShareOpen(true);
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="12"
                              height="12"
                            >
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line
                                x1="8.59"
                                y1="13.51"
                                x2="15.42"
                                y2="17.49"
                              />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            Share
                          </button>

                          <button
                            className="btn btn-delete"
                            onClick={(e) => handleDelete(e, doc._id)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="12"
                              height="12"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
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
