import React, { useState } from "react";
import { Modal } from './modal';
import { postTranscript } from "../lib/api";

export function TranscriptUploadModal({ children, onClose, onCreate }) {
  const [dataToUpload, setDataToUpload]             = useState(false);
  const [fileError,    setFileError]                = useState(null);
  const [loading,      setLoading]                  = useState(false);
  const [uploadedTranscript, setUploadedTranscript] = useState(false);


/***************************************************************************************************
* FILE UPLOADING
***************************************************************************************************/
  const onUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      validateUpload(e.target.result);
    }
    reader.onerror = (e) => {
      setFileError("Error reading file");
    }
    reader.readAsText(file);
    document.getElementById('upload-transcript-input').value = "";
  }


  async function uploadFile() {
    setLoading(true);
    const transcript = await postTranscript(dataToUpload);
    onCreate(transcript);
    setUploadedTranscript(transcript);
    resetModal();
  }


/***************************************************************************************************
* VALIDATION
***************************************************************************************************/
  const validateUpload = (dataStr) => {
    try {
      const data  = JSON.parse(dataStr);
      const valid = validateTranscription(data);
      if (valid) setDataToUpload(data);
    } catch(err) {
      setFileError("Invalid JSON");
    }
  }


  const validateTranscription = (transcription) => {
    if (typeof(transcription.title) != 'string' || !transcription.title) {
      setFileError("Missing title");
      return false;
    }
    if (!Array.isArray(transcription.snippets) || transcription.snippets.length == 0) {
      setFileError("Missing snippets");
      return false;
    }
    transcription.snippets.every(validateSnippet);
    return true;
  };


  const validateSnippet = (snippet) => {
    if (typeof(snippet.start) != 'number' || snippet.start < 0) {
      setFileError("Missing or invalid snippet start");
      return false;
    }
    if (typeof(snippet.end) != 'number' || snippet.end < 0) {
      setFileError("Missing or invalid snippet end");
      return false;
    }
    if (typeof(snippet.text) != 'string' || !snippet.text) {
      setFileError("Missing snippet text");
      return false;
    }
    return true;
  }


/***************************************************************************************************
* UI FEEDBACK
***************************************************************************************************/
  const FileErrorDisplay = () => {
    if (!fileError) return;
    return (<div className="error-msg">{fileError}</div>);
  }


  const SuccessDisplay = () => {
    if (!uploadedTranscript) return;
    return (<div className="success-msg">Uploaded transcript {uploadedTranscript.id}!</div>);
  }


/***************************************************************************************************
* MISC
***************************************************************************************************/
  const resetModal = () => {
    setDataToUpload(null);
    setLoading(false);
  }


/***************************************************************************************************
* COMPONENT TEMPLATE
***************************************************************************************************/
  return (
    <Modal title="Upload Transcript" onClose={onClose}>
      <div className={"controls-container" + (dataToUpload ? ' valid-upload' : '') + (loading ? ' loading' : '')}>


        <div className="upload-control">
          <div className="instructions">
            <p>Upload a transcript JSON file to get started</p>
            <p>Expected format: {`{ id, title, snippets: [{id, start, end, text}] }`}</p>
          </div>

          <button onClick={(e) => document.getElementById('upload-transcript-input').click()}>Select a File</button>
          <input 
            id="upload-transcript-input"
            type="file" 
            accept="application/json"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])} />

          <FileErrorDisplay />
          <SuccessDisplay />
        </div>


        <div className="submit-control">
          <div className="instructions">
            <p>Upload transcript?</p>
          </div>
          <button onClick={uploadFile}>Submit</button>
          <button onClick={resetModal}>Cancel</button>
        </div>


        <div className="loading-indicator">
            Loading... 
        </div>
      </div>
    </Modal>
  );
}
