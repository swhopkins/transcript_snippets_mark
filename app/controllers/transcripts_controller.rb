class TranscriptsController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /transcripts
  # Expected payload: { title, snippets: [{start, end, text}] }
  # Should create a transcript and its associated snippets
  # Return: { id: transcript_id }
  def create
    # TODO: Implement transcript import
    # 1. Parse and validate the incoming JSON
    # 2. Create transcript record
    # 3. Create associated snippet records
    # 4. Handle errors appropriately
    
    render json: { error: "Not implemented" }, status: :not_implemented
  end
end
