class ProjectsController < ApplicationController

def index 
    render json: Project.where(team_id: @current_user.team_id)
end

def create
project = @current_user.projects.create!(project_params)
render json: project, status: :created
end


def destroy 
project = find_project
  project.destroy
  head :no_content
end


def update
    project = find_project
     if project.user === @current_user
         project.update!(project_params)
         render json: project, status: :created 
     else render json: {error: "User is not valid"}
     end
end

def show
project = find_project
render json: project, status: :ok
end

private

def project_params
params.permit(:title, :description, :whiteboard, :team_id, :user_id)
end

def find_project
Project.find(params[:id])
end

end
