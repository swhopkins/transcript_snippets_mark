import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { listSnippets, patchSnippet, listTranscripts } from "../lib/api";
import { SnippetsTable } from "../components/snippets_table";
import { TranscriptUploadModal } from "../components/transcript_upload_modal";

function App() {
  const [loading,      setLoading]                 = useState(false);
  const [snippets,     setSnippets]                = useState([]);
  const [transcriptId, setTranscriptId]            = useState("");
  const [transcripts,  setTranscripts]             = useState([]);
  const [transcriptsLoaded, setTranscriptsLoaded]  = useState(false);


  const launchUploadModal = () => {
    document.body.classList.add('modal-active');
  }


  const closeUploadModal = () => {
    document.body.classList.remove('modal-active');
  }


  const handleTranscriptCreated = (transcript) => {
    transcripts.push(transcript);
    setTranscripts(transcripts);
  };


  const populateTranscripts = async () => {
    const allTranscripts = await listTranscripts();
    setTranscriptsLoaded(true);
    setTranscripts(allTranscripts);
  }


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

  if (!transcriptsLoaded) populateTranscripts();

  return (
    <>
      <div className="container">
        <div className="container-header">
          <div className="container-header-controls">
          <button type="button" onClick={launchUploadModal}>Upload Transcript</button>
          </div>
          <h1>Transcript Snippets</h1>
        </div>

        <SnippetsTable transcripts={transcripts} />

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
