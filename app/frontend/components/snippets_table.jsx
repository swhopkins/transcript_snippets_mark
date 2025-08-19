import React, { useState } from "react";


export function SnippetsTable({ transcripts }) {
  const [loading, setLoading] = useState(false);


  function TranscriptSelector({ transcripts }) {
    if (transcripts.length) {
      const options = transcripts.map(transcript => <option key={transcript.id} value={transcript.id}>{transcript.id} - {transcript.title}</option>);
      return (
        <select onChange={changeTranscript} defaultValue="" disabled={loading ? 'disabled' : ''}>
          <option value="" disabled>Select your transcript</option>
          {options}
        </select>
      );
    }

    return (
      <div className="instructions">
        <p>No available transcripts</p>
        <p>Create a transcript to begin</p>
      </div>
    );
  }


  const changeTranscript = (e) => {
    console.log(e.target.value);
    setLoading(true);

  };


  return (
    <div id="snippets-table">
      <div className="snippets-controls">
        <div className="transcript-selector">
          <TranscriptSelector transcripts={transcripts}/>
        </div>
      </div>

    </div>
  );
}
