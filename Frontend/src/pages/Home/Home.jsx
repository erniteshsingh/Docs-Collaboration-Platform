import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({ users: 0, documents: 0 });

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/v1/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Error fetching stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-orb orb-a" />
        <div className="hero-orb orb-b" />
        <div className="hero-orb orb-c" />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-pulse" />
              Real-time collaboration · Now live
            </div>

            <h1>
              Work Together On <span className="hero-highlight">Documents</span>
              <br />
              In Real-Time
            </h1>

            <p className="hero-sub">
              DocCollab helps teams create, edit and share documents instantly.
              Experience seamless collaboration with powerful productivity
              tools.
            </p>

            <div className="hero-btns">
              <button
                className="btn-primary"
                onClick={() => navigate("/documents")}
              >
                Open Dashboard
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  width="16"
                  height="16"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                className="btn-ghost"
                onClick={() => navigate("/documents")}
              >
                Try for Free
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <h3>{stats.documents || "2,400+"}</h3>
                <p>Documents Created</p>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h3>{stats.users || "1,200+"}</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>Data Safety</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="feature-pill pill-1">
              <div className="pill-icon pill-icon-blue">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <h4>Live Collaboration</h4>
                <p>Typing synced across team members</p>
              </div>
            </div>

            <div className="feature-pill pill-2">
              <div className="pill-icon pill-icon-purple">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <h4>Secure Sharing</h4>
                <p>Role-based access control</p>
              </div>
            </div>

            <div className="feature-pill pill-3">
              <div className="pill-icon pill-icon-green">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h4>Auto Save</h4>
                <p>No data loss. Ever.</p>
              </div>
            </div>

            <div className="doc-preview-card">
              <div className="preview-topbar">
                <div className="preview-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="preview-title-bar">quarterly-report.doc</span>
              </div>
              <div className="preview-lines">
                <div className="pline pline-wide" />
                <div className="pline pline-medium" />
                <div className="pline pline-short" />
                <div className="pline pline-wide" />
                <div className="pline pline-medium" />
              </div>
              <div className="preview-avatars">
                <div className="avatar av-1">A</div>
                <div className="avatar av-2">B</div>
                <div className="avatar av-3">C</div>
                <span className="avatar-label">3 editing now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-label">Why DocCollab</div>
        <h2>Everything your team needs</h2>
        <p className="section-sub">
          Built for speed, designed for collaboration, trusted by modern teams.
        </p>

        <div className="feature-grid">
          {[
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="24"
                  height="24"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
              ),
              color: "blue",
              title: "Real-Time Sync",
              desc: "See edits instantly without refreshing. Every keystroke is synced across collaborators.",
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="24"
                  height="24"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              ),
              color: "purple",
              title: "Rich Editor",
              desc: "Format text with headings, lists and styling tools built for professional documents.",
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="24"
                  height="24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              ),
              color: "green",
              title: "Team Workspace",
              desc: "Manage documents, assign roles, and keep your team in sync — all in one place.",
            },
          ].map((f, i) => (
            <div className={`feature-card fc-${f.color}`} key={i}>
              <div className={`fc-icon-wrap ic-${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-inner">
          <div className="cta-badge">Free forever · No credit card</div>
          <h2>
            Start Building Smarter
            <br />
            Documents Today
          </h2>
          <p>
            Join thousands of teams already using DocCollab to work better
            together.
          </p>
          <button className="cta-btn" onClick={() => navigate("/documents")}>
            Get Started Free
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              width="18"
              height="18"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
