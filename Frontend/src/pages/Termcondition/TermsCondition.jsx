import "./TermsCondition.css";
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "blue",
    title: "Use of Service",
    body: "You agree to use this platform only for lawful purposes and not for any misuse, abuse, or unauthorized activities.",
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
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    color: "purple",
    title: "User Content",
    body: "You are responsible for the documents you create, edit, and share. We do not take responsibility for user-generated content.",
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
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: "green",
    title: "Account Responsibility",
    body: "You are responsible for maintaining the confidentiality of your account and login credentials.",
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    color: "amber",
    title: "Permissions & Access",
    body: "Documents can only be accessed by users who are given permission. Any unauthorized access attempts are strictly prohibited.",
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
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    color: "red",
    title: "Termination",
    body: "We reserve the right to suspend or terminate accounts that violate our terms or misuse the platform.",
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
    color: "blue",
    title: "Changes to Terms",
    body: "These terms may be updated at any time. Continued use of the platform means you accept the updated terms.",
  },
];

const TermsCondition = () => {
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
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Legal
          </div>
          <h1>
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p>
            By using this platform, you agree to the following terms and
            conditions. Please read them carefully before proceeding.
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
              ~3 min read
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
          If you have any questions about these terms, feel free to{" "}
          <span onClick={() => navigate("/contact")}>contact us</span>.
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
