class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(params[:user][:email])
    if @user
      @authenticated_user = @user.authenticate(params[:user][:password])
      if @authenticated_user
        self.current_user = @authenticated_user
        redirect_to root_path
      else
        flash.now[:error] = "Invalid email/password combo"
        render :new
      end
    else
      @user = User.new(params[:user])
      flash.now[:error] = "Can't find that email!"
      render :new
    end
    
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end
