class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    @user = User.new if !logged_in?
    render partial: "shared/static", layout: "application"
    # render partial: "shared/landing", layout: "application"
  end

  def fetch
    #Uses Sunspot to search

    # it "has a search radius of 10"
    # it "shuffles the results"
    # context "when there are multiple pages of results"
    # context ""

    local_users = Geocode.find_local_users(params[:lat], params[:lng], 10)

    crops_available = Crop.all.map{|crop| {name: crop.name, count: crop.number_supplied(local_users)}}
    crops_available.reject! {|crop| crop[:count] == 0}

    crops_demanded = Crop.all.map{|crop| {name: crop.name, count: crop.number_demanded(local_users)}}
    crops_demanded.reject! {|crop| crop[:count] == 0}

    #Return to ajax call.
    render json: { user_count: local_users.count, crops_available: crops_available, crops_demanded: crops_demanded }
  end


  def find_in_box
    upperLeft = {lat: params[:ulat], lng: params[:ulng]}
    lowerRight = {lat: params[:blat], lng: params[:blng]}
    users_in_boundary = Geocode.boundary_search(upperLeft, lowerRight)

    parsed_users = []

    users_in_boundary.each do |user|
      hit = { user: user,
              lat:  user.geocode.lat,
              lng:  user.geocode.lng,
              supplies: user.supplies.map{|supply| supply.crop.name},
              demands: user.demands.map{|demand| demand.crop.name} }
      parsed_users << hit
    end

    respond_to do |format|
      format.json { render :json => parsed_users }
    end

  end
  
end
