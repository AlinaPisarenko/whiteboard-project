class Review < ApplicationRecord
  belongs_to :user
  belongs_to :project


    def image_url 
        user.profile_img
    end

    def name 
        user.name
    end

  
end
