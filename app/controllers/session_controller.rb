class SessionController < ApplicationController
  def new
  end

  def create
    puts params
    if login(params[:email], params[:password])
      redirect_to(root_path, notice: 'Logged in successfully.')
    else
      redirect_to(new_session_path, notice: 'Login failed.')
    end
  end

  def destroy
    logout
    redirect_to(root_path, notice: 'Logged out!')
  end
end
