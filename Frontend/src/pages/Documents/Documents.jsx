import { useEffect, useState } from "react";
import "./Documents.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/documents/",
        {
          credentials: "include",
        },
      );

      console.log(response.data.message);

      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.log("Error fetching documents", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, []);

  return (
    <div className="documents-page">
      <div className="documents-container">
        <div className="documents-header">
          <h1>Your Documents</h1>
          <button className="create-doc-btn">+ Create Document</button>
        </div>

        <div className="documents-list">
          {documents.length === 0 ? (
            <p>No documents yet</p>
          ) : (
            documents.map((doc) => (
              <div className="document-card" key={doc._id}>
                <h3>{doc.title}</h3>
                <p>{doc.content?.substring(0, 80)}...</p>
                <small>
                  Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
