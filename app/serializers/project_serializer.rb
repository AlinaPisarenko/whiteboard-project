class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :whiteboard
  has_one :user
  has_one :team
end
