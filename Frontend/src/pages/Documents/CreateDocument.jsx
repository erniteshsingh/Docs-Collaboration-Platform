import { useState } from "react";
import axios from "../../utils/axios";
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
        "/api/v1/documents",
        { title, content },
        { withCredentials: true },
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

      const res = await axios.post("/api/v1/ai/generate", {
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
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="create-doc-container">
        <div className="doc-header">
          <div className="header-badge">
            <span className="badge-dot" />
            New Document
          </div>
          <h2>
            Create Something <span className="gradient-text">Remarkable</span>
          </h2>
          <p>Craft documents manually or let AI accelerate your workflow.</p>
        </div>

        <form onSubmit={handleCreate} className="create-doc-form">
          <div className="input-group">
            <label className="input-label">Document Title</label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <input
                type="text"
                placeholder="Give your document a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="doc-input"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label className="input-label">Content</label>
              <span className="char-count">{content.length} chars</span>
            </div>
            <textarea
              placeholder="Start writing your document... or use AI below to generate content instantly."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="doc-textarea"
            />
          </div>

          <div className="ai-section">
            <div className="ai-section-glow" />

            <div className="ai-top">
              <div className="ai-header-text">
                <div className="ai-badge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  AI Assistant
                </div>
                <p>Generate or receive guidance on professional content.</p>
              </div>

              <div className="ai-mode">
                <button
                  type="button"
                  className={`mode-btn ${aiMode === "guide" ? "active-mode" : ""}`}
                  onClick={() => setAiMode("guide")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Guide Me
                </button>

                <button
                  type="button"
                  className={`mode-btn ${aiMode === "generate" ? "active-mode" : ""}`}
                  onClick={() => setAiMode("generate")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Write For Me
                </button>
              </div>
            </div>

            <div className="ai-box">
              <div className="ai-input-wrapper">
                <input
                  type="text"
                  placeholder={
                    aiMode === "guide"
                      ? "e.g. How do I write great API documentation?"
                      : "e.g. Write docs for an Online Car Bidding System"
                  }
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="ai-input"
                  onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                />
              </div>

              <button
                type="button"
                className="ai-btn"
                onClick={handleAskAI}
                disabled={loadingAI}
              >
                {loadingAI ? (
                  <span className="btn-inner">
                    <span className="spinner" />
                    Generating...
                  </span>
                ) : (
                  <span className="btn-inner">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="15"
                      height="15"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Ask AI
                  </span>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="create-btn">
            <span className="btn-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="16"
                height="16"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Create Document
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
