class Transcript < ApplicationRecord
  has_many :snippets

  validates :title, presence: true
end
