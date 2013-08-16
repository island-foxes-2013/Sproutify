class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(params[:session][:email])
    if @user
      @authenticated_user = @user.authenticate(params[:session][:password])
      if @authenticated_user
        self.current_user = @authenticated_user
        render "home/main"
      else
        render json: {session: params[:session], error: "Invalid password"}
      end
    else
      render json: {session: params[:session], error: "Invalid email"}
    end  
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end
