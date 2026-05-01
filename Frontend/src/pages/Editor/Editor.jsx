import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Editor.css";

const Editor = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || "viewer";
  const isViewer = role === "viewer";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDocument = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/v1/documents/${id}`,
        { withCredentials: true },
      );

      const doc = res.data.document;

      setTitle(doc.title);
      setContent(doc.content || "");
    } catch {
      toast.error("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async () => {
    if (isViewer) {
      toast.error("You do not have permission to edit");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/v1/documents/${id}`,
        { title, content },
        { withCredentials: true },
      );

      toast.success("Document saved!");
      navigate("/documents");
    } catch {
      toast.error("Error saving document");
    }
  };

  useEffect(() => {
    if (id) fetchDocument();
  }, [id]);

  if (loading) {
    return <div className="editor-page">Loading document...</div>;
  }

  return (
    <div className="editor-page">
      <div className="editor-container">
       
        <div className="editor-header">
          <input
            className="editor-title"
            value={title}
            onChange={(e) => {
              if (!isViewer) setTitle(e.target.value);
              else toast.error("View only access");
            }}
            disabled={isViewer}
          />

          <div className="editor-actions">
            {!isViewer ? (
              <>
                <button className="save-btn" onClick={saveDocument}>
                  Save
                </button>

                <button className="share-btn">Share</button>
              </>
            ) : (
              <button
                className="back-btn"
                onClick={() => navigate("/documents")}
              >
                Back to Documents
              </button>
            )}
          </div>
        </div>

       
        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => {
            if (!isViewer) setContent(e.target.value);
            else toast.error("You do not have permission to edit");
          }}
          readOnly={isViewer}
          placeholder="Start writing your document..."
        />
      </div>
    </div>
  );
};

export default Editor;
