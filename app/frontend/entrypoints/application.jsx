import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { postTranscript, listSnippets, patchSnippet } from "../lib/api";

function App() {
  const [transcriptId, setTranscriptId] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    // TODO: Implement file upload
    // 1. Read the file content
    // 2. Parse JSON
    // 3. Call postTranscript API
    // 4. Load snippets for the new transcript
    console.log("File upload not implemented", file);
  };

  const handleSearch = async (query) => {
    // TODO: Implement search
    // Either filter locally or make API call with query param
    console.log("Search not implemented", query);
  };

  const handleToggleReview = async (snippetId, needsReview) => {
    // TODO: Implement toggle review status
    // 1. Call patchSnippet API
    // 2. Update local state
    console.log("Toggle review not implemented", snippetId, needsReview);
  };

  return (
    <div className="container">
      <h1>Transcript Snippets</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="file" 
          accept="application/json"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
        />
      </div>

      {/* TODO: Add search input */}
      {/* TODO: Add snippets list */}
      {/* TODO: Add loading states */}
      
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        <p>Upload a transcript JSON file to get started</p>
        <p style={{ fontSize: "14px", marginTop: "10px" }}>
          Expected format: {`{ id, title, snippets: [{id, start, end, text}] }`}
        </p>
      </div>
    </div>
  );
}

// Mount the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
