class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password_digest, :email, :profile_img, :team_id
  has_many :projects

end
