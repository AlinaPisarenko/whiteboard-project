class ApplicationController < ActionController::API
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
include ActionController::Cookies

before_action :authorize
 
private 

def authorize
 @current_user = User.find_by(id: session[:user_id])
 render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user 
end

def record_not_found(invalid)
 render json: {error: "#{invalid.model} not found"}, status: 404
end

def record_invalid(invalid)
render json: {errors: invalid.record.errors.full_messages}, status: 422
end
end
