class ProjectsController < ApplicationController

def index 
    render json: Project.all
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

private

def project_params
params.permit(:title, :description, :whiteboard)
end

def find_project
Project.find(params[:id])
end

end
