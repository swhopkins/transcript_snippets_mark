import React, { useState } from "react";
import { listSnippets, patchSnippet, listTranscripts } from "../lib/api";


export function SnippetsTable({ transcripts }) {
  const [loading,      setLoading]      = useState(false);
  const [snippets,     setSnippets]     = useState([]);
  const [transcriptId, setTranscriptId] = useState([]);


  function TranscriptSelector({ transcripts }) {
    if (transcripts.length) {
      const options = transcripts.map(transcript => <option key={transcript.id} value={transcript.id}>{transcript.id} - {transcript.title}</option>);
      return (
        <select onChange={changeTranscript} defaultValue={transcriptId} disabled={loading ? 'disabled' : ''}>
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


  function Snippets() {
    if (snippets.length == 0) return;

    const rows = snippets.map(snippet => <SnippetRow key={snippet.id} snippet={snippet} />)

    return (
      <div className="snippets">
        <table>
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Text</th>
              <th>Needs Review?</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }


  function SnippetRow({ snippet }) {
    return (
      <tr>
        <td>{snippet.start}</td>
        <td>{snippet.end}</td>
        <td>{snippet.text}</td>
        <td>
          <input type="checkbox" value={snippet.id} onChange={handleUpdateReviewStatus} defaultChecked={snippet.needs_review}/>
        </td>
      </tr>
    );
  }


  const handleUpdateReviewStatus = (e) => {
    const snippetId   = e.target.value;
    const snippet     = snippets.find(aSnippet => aSnippet.id == snippetId)
    const needsReview = e.target.checked;
    snippet.needs_review = needsReview;

    patchSnippet(snippetId, {needs_review: needsReview});
  }


  const changeTranscript = (e) => {
    const _transcriptId = e.target.value;
    setLoading(true);
    setTranscriptId(_transcriptId);
    listSnippets(_transcriptId).then(transcriptSnippets => {
      setSnippets(transcriptSnippets);
      setLoading(false);
    });
  };


  return (
    <div id="snippets-table">
      <div className="snippets-controls">
        <div className="transcript-selector">
          <TranscriptSelector transcripts={transcripts}/>
        </div>
      </div>

      <Snippets />
    </div>
  );
}
