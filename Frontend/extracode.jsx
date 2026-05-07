import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateDocument.css";

const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMode, setAiMode] = useState("guide");

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

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;

    try {
      setLoadingAI(true);

      const res = await axios.post("http://localhost:5000/api/v1/ai/generate", {
        prompt: aiPrompt,
        mode: aiMode,
      });

      setContent((prev) => prev + "\n\n" + res.data.result);

      if (!title && aiPrompt.length > 5) {
        setTitle(aiPrompt);
      }

      setAiPrompt("");
    } catch (error) {
      console.log("AI Error", error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="create-doc-page">
      <div className="create-doc-container">
        <div className="doc-header">
          <h2>Create New Document</h2>
          <p>
            Write documents manually or use AI to generate professional content.
          </p>
        </div>

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

          <div className="ai-section">
            <div className="ai-top">
              <div>
                <h3>AI Assistant</h3>
                <p>
                  Generate documentation or get professional writing guidance.
                </p>
              </div>

              <div className="ai-mode">
                <button
                  type="button"
                  className={`mode-btn ${
                    aiMode === "guide" ? "active-mode" : ""
                  }`}
                  onClick={() => setAiMode("guide")}
                >
                  Guide Me
                </button>

                <button
                  type="button"
                  className={`mode-btn ${
                    aiMode === "generate" ? "active-mode" : ""
                  }`}
                  onClick={() => setAiMode("generate")}
                >
                  Write For Me
                </button>
              </div>
            </div>

            <div className="ai-box">
              <input
                type="text"
                placeholder={
                  aiMode === "guide"
                    ? "Example: How to write docs for my project?"
                    : "Example: Write docs for Online Car Bidding System"
                }
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />

              <button
                type="button"
                className="ai-btn"
                onClick={handleAskAI}
                disabled={loadingAI}
              >
                {loadingAI ? "Generating..." : "Ask AI"}
              </button>
            </div>
          </div>

          <button type="submit" className="create-btn">
            Create Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
