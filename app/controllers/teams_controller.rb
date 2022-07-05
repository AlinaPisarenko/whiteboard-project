class TeamsController < ApplicationController
    skip_before_action :authorize, only: :index

def index 
render json: Team.all
end

def create
team = Team.create!(team_params)
render json: team, status: :created
end

private 

def team_params
params.permit(:name, :members)
end

end
