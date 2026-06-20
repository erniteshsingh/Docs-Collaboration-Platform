import "./PrivacyPolicy.css";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: "blue",
    title: "Information We Collect",
    body: "We collect your name, email, and documents created or shared within the platform.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "purple",
    title: "How We Use Data",
    body: "Your data is used to provide collaboration features and manage permissions across the platform.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    color: "green",
    title: "Data Sharing",
    body: "We do not sell your data. Documents are only shared with users you explicitly allow.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "amber",
    title: "Security",
    body: "We take reasonable steps to protect your data but cannot guarantee complete security against all threats.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    color: "red",
    title: "Updates",
    body: "This policy may be updated over time. Continued use of the platform means acceptance of the revised policy.",
  },
];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-page">
      <div className="policy-bg-orb orb-1" />
      <div className="policy-bg-orb orb-2" />

      <div className="policy-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            width="15"
            height="15"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <div className="policy-header">
          <div className="policy-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="13"
              height="13"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Privacy
          </div>
          <h1>
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our platform.
          </p>
          <div className="policy-meta">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="13"
                height="13"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Last updated: January 2025
            </span>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="13"
                height="13"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              ~2 min read
            </span>
          </div>
        </div>

        <div className="policy-divider">
          <span>Sections</span>
        </div>

        <div className="policy-sections">
          {sections.map((s, i) => (
            <div className={`policy-section-card sc-${s.color}`} key={i}>
              <div className={`section-icon-wrap si-${s.color}`}>{s.icon}</div>
              <div className="section-content">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="policy-footer-note">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Have questions about how we handle your data? Feel free to{" "}
          <span onClick={() => navigate("/contact")}>contact us</span>.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
