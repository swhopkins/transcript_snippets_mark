// API client functions for interacting with Rails backend

export async function postTranscript(transcriptData) {
  // TODO: Implement POST /transcripts
  // Send transcript data to create a new transcript with snippets
  // Return the created transcript ID
  
  throw new Error("postTranscript not implemented");
}

export async function listSnippets(transcriptId, query) {
  // TODO: Implement GET /transcripts/:id/snippets
  // Fetch snippets for a transcript
  // Include optional search query parameter
  // Return array of snippet objects
  
  throw new Error("listSnippets not implemented");
}

export async function patchSnippet(snippetId, updates) {
  // TODO: Implement PATCH /snippets/:id
  // Update snippet's needs_review status
  // Return updated snippet data
  
  throw new Error("patchSnippet not implemented");
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