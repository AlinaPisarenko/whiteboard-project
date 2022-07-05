class UsersController < ApplicationController
      skip_before_action :authorize, only: :create

def index  
render json: User.where(team_id: @current_user.team_id), status: :ok
end


    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: :created 
    end

    def show
        render json: @current_user
    end 

    private 

    def user_params 
        params.permit(:name, :username, :password, :email, :profile_img, :team_id)
    end
end
