class UsersController < ApplicationController
  skip_before_filter :require_login
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.save
    if @user.errors.any?
      render "home/landing"
    else
      self.current_user = @user
      render "home/main"
    end
  end

end
