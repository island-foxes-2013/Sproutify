class UsersController < ApplicationController
  skip_before_filter :require_login
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.save
    if @user.errors.any?
      render json: {
        errors: @user.errors,
        errorElem: render_to_string(partial:"shared/error", locals: { error_messages: @user.errors.full_messages })
      }
    else
      self.current_user = @user
      @user.create_geocode(lat: params[:lat].to_f,
                           lng: params[:lng].to_f)
      render json:{
        pageElem: render_to_string(partial: "shared/main")
      }
    end
  end

end
