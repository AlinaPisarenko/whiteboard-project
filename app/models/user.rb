class User < ApplicationRecord
    has_secure_password
    has_many :projects, dependent: :destroy 
    has_many :reviews, dependent: :destroy 
    has_many :teams, through: :projects

    validates :username, presence: true, uniqueness: true
end
