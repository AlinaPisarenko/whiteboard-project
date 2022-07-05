class Team < ApplicationRecord
    has_many :projects
    has_many :users, through: :projects

def members
  
end


end
