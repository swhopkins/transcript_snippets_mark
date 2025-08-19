class SnippetsController < ApplicationController
  protect_from_forgery with: :null_session

  # GET /transcripts/:transcript_id/snippets
  # Optional query param: ?query=searchterm
  # Return: Array of snippet objects with id, start, end, text, needs_review
  def index
    # TODO: Implement snippet listing
    # 1. Find snippets for the given transcript_id
    # 2. Apply search filter if query param is present
    # 3. Order by start time
    # 4. Return as JSON
    
    render json: []
  end

  # PATCH /snippets/:id
  # Expected payload: { needs_review: true/false }
  # Return: { id, needs_review }
  def update
    # TODO: Implement snippet update
    # 1. Find the snippet by ID
    # 2. Update the needs_review field
    # 3. Handle not found errors
    # 4. Return updated snippet data
    
    render json: { error: "Not implemented" }, status: :not_implemented
  end
end