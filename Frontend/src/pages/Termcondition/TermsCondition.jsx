import "./TermsCondition.css";
import { useNavigate } from "react-router-dom";

const TermsCondition = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-page">
      <div className="policy-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>Terms & Conditions</h1>

        <p>
          By using this platform, you agree to the following terms and
          conditions. Please read them carefully.
        </p>

        <h3>Use of Service</h3>
        <p>
          You agree to use this platform only for lawful purposes and not for
          any misuse, abuse, or unauthorized activities.
        </p>

        <h3>User Content</h3>
        <p>
          You are responsible for the documents you create, edit, and share. We
          do not take responsibility for user-generated content.
        </p>

        <h3>Account Responsibility</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and login credentials.
        </p>

        <h3>Permissions & Access</h3>
        <p>
          Documents can only be accessed by users who are given permission. Any
          unauthorized access attempts are strictly prohibited.
        </p>

        <h3>Termination</h3>
        <p>
          We reserve the right to suspend or terminate accounts that violate our
          terms or misuse the platform.
        </p>

        <h3>Changes to Terms</h3>
        <p>
          These terms may be updated at any time. Continued use of the platform
          means you accept the updated terms.
        </p>
      </div>
    </div>
  );
};

export default TermsCondition;
