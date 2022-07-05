class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :whiteboard, :team_id
  has_one :user
  has_one :team
  has_many :reviews
end
