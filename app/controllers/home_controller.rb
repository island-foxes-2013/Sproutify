class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    @user = User.new if !logged_in?
    render partial: "shared/static", layout: "application"
  end

  def fetch
    local_users = Geocode.find_local_users(params[:lat], params[:lng], 10)

    crops_available = Crop.all.map{|crop| {name: crop.name, count: crop.number_supplied(local_users)}}
    crops_available.reject! {|crop| crop[:count] == 0}

    crops_demanded = Crop.all.map{|crop| {name: crop.name, count: crop.number_demanded(local_users)}}
    crops_demanded.reject! {|crop| crop[:count] == 0}

    #Return to ajax call.
    render json: { user_count: local_users.count, crops_available: crops_available, crops_demanded: crops_demanded }
  end
end
