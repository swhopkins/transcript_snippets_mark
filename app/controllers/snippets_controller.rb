class SnippetsController < ApplicationController
  protect_from_forgery with: :null_session

  # GET /transcripts/:transcript_id/snippets
  # Optional query param: ?query=searchterm
  # Return: Array of snippet objects with id, start, end, text, needs_review
  def index
    snippets = search_snippets
    render json: {snippets: snippets.map(&:as_json)}, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {}, status: :not_found
  end


  # PATCH /snippets/:id
  # Expected payload: { needs_review: true/false }
  # Return: { id, needs_review }
  def update
    render json: {error: "Missing snippet data"}, status: :bad_request and return if params[:snippet].blank?
    render json: {error: "Missing snippet data"}, status: :bad_request and return unless params[:snippet].has_key?(:needs_review)

    snippet              = Snippet.find(params[:id]);
    snippet.needs_review = params[:snippet][:needs_review]
    snippet.save
    
    render json: {id: snippet.id, needs_review: snippet.needs_review?, snippet: snippet.as_json}, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {}, status: :not_found
  end


####################################################################################################
# SEARCH HELPERS
####################################################################################################
  private def search_snippets
    snippets = Snippet.where(:transcript_id => params[:transcript_id])
    snippets = snippets.search(params[:query]) if params[:query].present?

    snippets.order("start asc").to_a
  end
end
