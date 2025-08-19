import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { listSnippets, patchSnippet } from "../lib/api";
import { TranscriptUploadModal } from "../components/transcript_upload_modal";

function App() {
  const [transcriptId, setTranscriptId] = useState("");
  const [snippets, setSnippets]         = useState([]);
  const [loading, setLoading]           = useState(false);


  const launchUploadModal = () => {
      document.body.classList.add('modal-active');
  }


  const closeUploadModal = () => {
      document.body.classList.remove('modal-active');
  }


  const handleFileUpload = async (file) => {
    // TODO: Implement file upload
    // 1. Read the file content
    // 2. Parse JSON
    // 3. Call postTranscript API
    // 4. Load snippets for the new transcript
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
    <>
      <div className="container">
        <div className="container-header">
          <div className="container-header-controls">
          <button type="button" onClick={launchUploadModal}>Upload Transcript</button>
          </div>
          <h1>Transcript Snippets</h1>
        </div>

      {/* TODO: Add search input */}
      {/* TODO: Add snippets list */}
      {/* TODO: Add loading states */}
      
      </div>

      <TranscriptUploadModal onClose={closeUploadModal}></TranscriptUploadModal>
    </>
  );
}

// Mount the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
