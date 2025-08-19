class Snippet < ApplicationRecord
  belongs_to :transcript

  validates :start, presence: true, numericality: {greater_than_or_equal_to: 0}
  validates :end,   presence: true, numericality: {greater_than_or_equal_to: 0}
  validates :text,  presence: true
  # TODO: Add search scope for text searching


  def serializable_hash(options=nil)
    {
      end:          self.end,
      id:           id,
      needs_review: needs_review,
      start:        start,
      text:         text
    }
  end
end
