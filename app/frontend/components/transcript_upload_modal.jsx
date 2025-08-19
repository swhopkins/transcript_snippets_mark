import React, { useState } from "react";
import { Modal } from './modal';
import { postTranscript } from "../lib/api";

export function TranscriptUploadModal({ children, onClose }) {
  const [fileError, setFileError]       = useState(null);
  const [dataToUpload, setDataToUpload] = useState(false);


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


  const validateUpload = (dataStr) => {
    try {
      const data  = JSON.parse(dataStr);
      const valid = data.every(validateRow);
      setDataToUpload(data);
    } catch(err) {
      setFileError("Invalid JSON");
    }
  }


  const validateRow = (row) => {
    if (typeof(row.title) != 'string' || !row.title) {
      setFileError("Missing title");
      return false;
    }
    if (!Array.isArray(row.snippets) || row.snippets.length == 0) {
      setFileError("Missing snippets");
      return false;
    }
    row.snippets.every(validateSnippet);
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


  const FileErrorDisplay = () => {
    if (!fileError) return;
    return (<div className="error-msg">{fileError}</div>);
  }


  async function uploadFile() {
    await postTranscript(dataToUpload);
  }


  const resetModal = () => {
    setDataToUpload(false);
  }


  return (
    <Modal title="Upload Transcript" onClose={onClose}>
      <div className={"controls-container" + (dataToUpload ? ' valid-upload' : '')}>
        <div className="upload-control">
          <button onClick={(e) => document.getElementById('upload-transcript-input').click()}>Select a File</button>
          <input 
            id="upload-transcript-input"
            type="file" 
            accept="application/json"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])} />

          <FileErrorDisplay />
        </div>

        <div className="submit-control">
          <button onClick={uploadFile}>Submit</button>
          <button onClick={resetModal}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
