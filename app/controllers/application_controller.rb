class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Will need to eventually disable this security hole
  skip_before_action :verify_authenticity_token

  def main
    render '/main'
  end
end
