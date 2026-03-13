import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Editor.css";

const Editor = () => {
  const { id } = useParams();

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
    } catch (error) {
      console.log("Error fetching document", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/documents/${id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Document saved!");
    } catch (error) {
      console.log("Error saving document", error);
    }
  };

  const shareDocument = () => {
    toast.success("Share feature coming soon");
  };

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
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
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="editor-actions">
            <button className="save-btn" onClick={saveDocument}>
              Save
            </button>

            <button className="share-btn" onClick={shareDocument}>
              Share
            </button>
          </div>
        </div>

        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your document..."
        />
      </div>
    </div>
  );
};

export default Editor;
