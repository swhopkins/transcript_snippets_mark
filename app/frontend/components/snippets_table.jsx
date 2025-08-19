import React, { useState } from "react";
import { listSnippets, patchSnippet, listTranscripts } from "../lib/api";


export function SnippetsTable({ transcripts }) {
  const [activeQuery,  setActiveQuery]  = useState("");
  const [loading,      setLoading]      = useState(false);
  const [snippets,     setSnippets]     = useState([]);
  const [transcriptId, setTranscriptId] = useState(null);
  let   searchTimer                     = null;
  const searchDelay                     = 500;


  function TranscriptSelector({ transcripts }) {
    if (transcripts.length) {
      const options = transcripts.map(transcript => <option key={transcript.id} value={transcript.id}>{transcript.id} - {transcript.title}</option>);
      return (
        <select onChange={handleChangeTranscript} value={transcriptId} disabled={loading ? 'disabled' : ''}>
          <option value="" hidden>Select your transcript</option>
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


  function SnippetSearch() {
    if (!transcriptId) return;
    return (
      <input type="text" id="snippet-search" placeholder="Search snippets..." onChange={handleSnippetSearchChange} defaultValue={activeQuery} />
    )
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



  const handleSnippetSearchChange = (e) => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(performSnippetSearch, searchDelay);
  }


  const performSnippetSearch = () => {
    fetchSnippets(transcriptId);
  }


  const handleChangeTranscript = (e) => {
    const _transcriptId = e.target.value;
    setTranscriptId(_transcriptId);
    fetchSnippets(_transcriptId);
  };


  const fetchSnippets = (_transcriptId) => {
    const searchInput = document.getElementById('snippet-search');
    let query;
    if (searchInput) query = searchInput.value;
    setLoading(true);
    listSnippets(_transcriptId, query).then(transcriptSnippets => {
      setSnippets(transcriptSnippets);
      setActiveQuery(query);
      setLoading(false);
    });
  }


  return (
    <div id="snippets-table">
      <div className="snippets-controls">
        <div className="transcript-selector">
          <TranscriptSelector transcripts={transcripts}/>
        </div>
        <SnippetSearch />
      </div>

      <Snippets />
    </div>
  );
}
