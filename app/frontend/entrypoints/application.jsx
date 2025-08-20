import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { listTranscripts } from "../lib/api";
import { SnippetsTable } from "../components/snippets_table";
import { TranscriptUploadModal } from "../components/transcript_upload_modal";

function App() {
  const [loading,      setLoading]                 = useState(false);
  const [transcripts,  setTranscripts]             = useState([]);
  const [transcriptsLoaded, setTranscriptsLoaded]  = useState(false);

  // I'm using this to force a rerender of the view when there's a new transcript added to the selector
  // I'm sure there's a better way to do this, but I'm still honing my React chops
  const [, forceUpdate]                            = useReducer(x => x + 1, 0);


  const launchUploadModal = () => {
    document.body.classList.add('modal-active');
  }


  const closeUploadModal = () => {
    document.body.classList.remove('modal-active');
  }


  const handleTranscriptCreated = (transcript) => {
    transcripts.push(transcript);
    setTranscripts(transcripts);
    forceUpdate();
  };


  const populateTranscripts = async () => {
    const allTranscripts = await listTranscripts();
    setTranscriptsLoaded(true);
    setTranscripts(allTranscripts);
  }


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

      <TranscriptUploadModal onCreate={handleTranscriptCreated} onClose={closeUploadModal}></TranscriptUploadModal>
    </>
  );
}

// Mount the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
