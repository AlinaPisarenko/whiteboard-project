class ReviewSerializer < ActiveModel::Serializer
   attributes :id, :user_id, :content, :name, :project_id, :image_url
  has_one :user
  has_one :project
end
