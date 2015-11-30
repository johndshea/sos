class SessionController < ApplicationController
  def new
  end

  def create
    puts params
    if login(params[:email], params[:password])
      redirect_back_or_to(root_path, notice: 'Logged in successfully.')
    else
      flash.now.alert = "Login failed."
      render action: :new
    end
  end

  def destroy
    logout
    redirect_to(root_path, notice: 'Logged out!')
  end
end
