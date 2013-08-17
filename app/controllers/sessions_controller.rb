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
        render json:{
          pageElem: render_to_string(partial: "shared/main")
        }
      else
        errors = {password: "invalid"}
        error_messages = ["Invalid password"]
        render json: {
          errors: errors,
          errorElem: render_to_string(partial:"shared/error", locals: { error_messages: error_messages })
        }
      end
    else
      errors = {email: "unrecognized"}
      error_messages = ["Unrecognized email"]
      render json: {
        errors: errors,
        errorElem: render_to_string(partial:"shared/error", locals: { error_messages: error_messages })
      }
    end  
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end
