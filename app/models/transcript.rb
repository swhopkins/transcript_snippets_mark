class Transcript < ApplicationRecord
  has_many :snippets

  validates :title, presence: true


  def serializable_hash(options=nil)
    {
      id:    id,
      title: title,
    }
  end
end
