import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* NAV SPACE HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Work Together <span>On Documents</span> <br />
            In Real-Time
          </h1>

          <p>
            DocCollab helps teams create, edit and share documents instantly.
            Experience seamless collaboration with powerful productivity tools.
          </p>

          <div className="hero-btns">
            <button
              className="primary-btn"
              onClick={() => navigate("/documents")}
            >
              Open Dashboard
            </button>

            <button className="ghost-btn" onClick={() => navigate("/register")}>
              Try for Free
            </button>
          </div>

          <div className="stats">
            <div>
              <h3>10K+</h3>
              <p>Documents Created</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>Active Users</p>
            </div>

            <div>
              <h3>99%</h3>
              <p>Data Safety</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass-card">
            <h4>Live Collaboration</h4>
            <p>Typing synced across team members</p>
          </div>

          <div className="glass-card">
            <h4>Secure Sharing</h4>
            <p>Role-based access control</p>
          </div>

          <div className="glass-card">
            <h4>Auto Save</h4>
            <p>No data loss. Ever.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Powerful Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Real-Time Sync</h3>
            <p>See edits instantly without refreshing.</p>
          </div>

          <div className="feature-card">
            <h3>Rich Editor</h3>
            <p>Format text with headings, lists and styling.</p>
          </div>

          <div className="feature-card">
            <h3>Team Workspace</h3>
            <p>Manage documents with your team efficiently.</p>
          </div>

          <div className="feature-card">
            <h3>Cloud Storage</h3>
            <p>Access documents anytime from anywhere.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta">
        <h2>Start Building Smarter Documents Today</h2>
        <button
          className="primary-btn big-btn"
          onClick={() => navigate("/register")}
        >
          Get Started Free
        </button>
      </section>
    </div>
  );
};

export default Home;
