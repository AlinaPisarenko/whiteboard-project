class User < ApplicationRecord
    has_secure_password
    has_many :projects, dependent: :destroy 
    has_many :reviews, dependent: :destroy 
    belongs_to :team

    validates :username, presence: true, uniqueness: true
end
