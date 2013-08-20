class UsersController < ApplicationController
  skip_before_filter :require_login

  def create
    @user = User.new(params[:user])
    @user.save
    if @user.errors.any?
      render json: {
        success: false,
        logged_in: false,
        errors: @user.errors.full_messages
      }
    else
      self.current_user = @user
      @user.create_geocode(lat: params[:lat].to_f,
                           lng: params[:lng].to_f)
      render json:{
        success: true,
        user: @user,
        logged_in: true,
        current_user: current_user
      }
    end
  end

  def email_user
    recipient = User.find_by_id(params[:id])
    current_user.send_message(recipient, params[:content], "subject")
    render json: {recipient: recipient}
  end
end
