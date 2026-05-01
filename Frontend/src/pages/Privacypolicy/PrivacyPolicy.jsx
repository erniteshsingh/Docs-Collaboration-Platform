import "./PrivacyPolicy.css";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-page">
      <div className="policy-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Privacy Policy</h1>

        <p>
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our platform.
        </p>

        <h3>Information We Collect</h3>
        <p>
          We collect your name, email, and documents created or shared within
          the platform.
        </p>

        <h3>How We Use Data</h3>
        <p>
          Your data is used to provide collaboration features and manage
          permissions.
        </p>

        <h3>Data Sharing</h3>
        <p>
          We do not sell your data. Documents are only shared with users you
          allow.
        </p>

        <h3>Security</h3>
        <p>
          We take reasonable steps to protect your data but cannot guarantee
          complete security.
        </p>

        <h3>Updates</h3>
        <p>
          This policy may be updated over time. Continued use means acceptance.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
