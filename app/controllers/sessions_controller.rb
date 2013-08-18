class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def index
    render json: {
      logged_in: logged_in?,
      current_user: current_user
    }
  end

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(params[:session][:email])
    if @user
      @authenticated_user = @user.authenticate(params[:session][:password])
      if @authenticated_user
        self.current_user = @authenticated_user
        render json:{
          success: true,
          current_user: current_user
        }
      else
        errors = {password: "invalid"}
        error_messages = ["Invalid password"]
        render json: {
          success: false,
          errors: errors
        }
      end
    else
      errors = {email: "unrecognized"}
      error_messages = ["Unrecognized email"]
      render json: {
        success: false,
        errors: errors
      }
    end  
  end

  def destroy
    session.clear
    render json:{
      success: true
    }
  end

end
