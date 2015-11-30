class SessionController < ApplicationController
  def new
  end

  def create
    puts params
    if login(params[:email], params[:password])
      redirect_back_or_to(application_path, notice: 'Logged in successfully.')
    else
      flash.now.alert = "Login failed."
    end
  end

  def destroy
    logout
    redirect_to(application_path, notice: 'Logged out!')
  end
end
