import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateDocument.css";

const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/documents",
        {
          title,
          content,
        },
        {
          withCredentials: true,
        },
      );

      const docId = res.data.document._id;

      navigate(`/documents/${docId}`);
    } catch (error) {
      console.log("Error creating document", error);
    }
  };

  return (
    <div className="create-doc-page">
      <div className="create-doc-container">
        <h2>Create New Document</h2>

        <form onSubmit={handleCreate} className="create-doc-form">
          <input
            type="text"
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Start writing your document..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">Create Document</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
