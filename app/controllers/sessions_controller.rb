class SessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]

  def index
    if logged_in?
      render json: {
        logged_in: logged_in?,
        user: current_user,
        user_lat: current_user.geocode.lat,
        user_lng: current_user.geocode.lng
      }
    else
      render json: {
        logged_in: logged_in?
      }
    end
  end

  def create
    @user = User.find_by_email(params[:session][:email])
    if @user
      @authenticated_user = @user.authenticate(params[:session][:password])
      if @authenticated_user
        self.current_user = @authenticated_user
        render json:{
          logged_in: true,
          user: current_user
        }
      else
        errors = ["Invalid password"]
        render json: {
          logged_in: false,
          errors: errors
        }
      end
    else
      errors = ["Unrecognized eamil"]
      render json: {
        logged_in: false,
        errors: errors
      }
    end  
  end

  def destroy
    session.clear
    render json:{
      logged_in: false
    }
  end

  def user_data
    if logged_in?
      render json: {
        user_lat: current_user.geocode.lat,
        user_lng: current_user.geocode.lng
      } 
    end
  end

end
