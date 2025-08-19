// API client functions for interacting with Rails backend

export async function postTranscript(transcriptData) {
  const response = await fetchAPI("/transcripts", {
    body: JSON.stringify({transcript: transcriptData}),
    method: "POST"
  });

  return response.transcript;
}


export async function listTranscripts() {
  const response = await fetchAPI("/transcripts", {
    method: "GET"
  });

  return response.transcripts;
}


export async function listSnippets(transcriptId, query) {
  // TODO: Implement GET /transcripts/:id/snippets
  // Fetch snippets for a transcript
  // Include optional search query parameter
  // Return array of snippet objects
  
  const response = await fetchAPI(`/transcripts/${transcriptId}/snippets`, {
    method: "GET"
  });

  return response.snippets;
}


export async function patchSnippet(snippetId, updates) {
  const response = await fetchAPI(`/snippets/${snippetId}`, {
    body: JSON.stringify({snippet: updates}),
    method: "PATCH"
  });

  return response.snippet;
}


// Helper function for making fetch requests (provided for convenience)
async function fetchAPI(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
