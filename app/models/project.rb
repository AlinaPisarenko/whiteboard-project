class Project < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :reviews
end
