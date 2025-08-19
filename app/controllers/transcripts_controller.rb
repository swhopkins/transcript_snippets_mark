class TranscriptsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    # TODO: Implement transcript import
    # 1. Parse and validate the incoming JSON
    # 2. Create transcript record
    # 3. Create associated snippet records
    # 4. Handle errors appropriately

    transcript = create_transcript
    
    render json: { id: transcript.id, transcript: transcript.as_json}, status: :ok unless performed?
  end


  private def create_transcript
    render json: {error: "Missing transcript"}, status: :bad_request and return if transcript_params.blank?
    render json: {error: "Missing snippets"},   status: :bad_request and return if snippets_params.blank?

    transcript = Transcript.new :title => transcript_params[:title]
    render json: {error: "Invalid transcript"}, status: :bad_request and return if transcript.invalid?

    for snippet_data in snippets_params
      snippet = Snippet.new(
        :end => snippet_data[:end],
        :start => snippet_data[:start],
        :text => snippet_data[:text],
      )
      transcript.snippets << snippet
      render json: {error: "Invalid snippet"}, status: :bad_request and return if snippet.invalid?
    end

    transcript.save
    transcript
  end


  private def transcript_params
    params[:transcript]
  end


  private def snippets_params
    transcript_params[:snippets]
  end
end
