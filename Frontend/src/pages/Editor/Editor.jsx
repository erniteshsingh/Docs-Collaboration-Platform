import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { socket } from "../../socket/socket";
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
        {
          withCredentials: true,
        },
      );

      const doc = res.data.document;

      setTitle(doc.title);
      setContent(doc.content || "");
    } catch (error) {
      toast.error("Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("join-document", id);
    });

    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });

    return () => {
      socket.off("receive-changes");
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (isViewer) return;

    const timer = setTimeout(() => {
      socket.emit("save-document", {
        docId: id,
        content,
      });

      console.log("Document auto-saved");
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, id, isViewer]);

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
              if (!isViewer) {
                setTitle(e.target.value);
              } else {
                toast.error("View only access");
              }
            }}
            disabled={isViewer}
          />

          <div className="editor-actions">
            {!isViewer ? (
              <>
                <button
                  className="save-btn"
                  onClick={() => toast.success("Auto-save already enabled")}
                >
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
            if (isViewer) {
              toast.error("You do not have permission to edit");
              return;
            }

            const newContent = e.target.value;

            setContent(newContent);

            socket.emit("edit-document", {
              docId: id,
              content: newContent,
            });
          }}
          readOnly={isViewer}
          placeholder="Start writing your document..."
        />
      </div>
    </div>
  );
};

export default Editor;
