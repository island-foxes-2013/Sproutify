class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    @user = User.new if !logged_in?
    render partial: "shared/static", layout: "application"
  end

  def main

  end

  def fetch
    #Uses Sunspot to search
    search = Geocode.search do
      with(:location).in_radius(params[:lat], params[:lng], 10)
    end

    crops_available = []

    search.results.shuffle.each do |result|
      User.find_by_id(result[:user_id]).supplies.each do |supply|
        crop = {}
        crop[:name] = supply.crop.name
        crop[:count] = supply.crop.supplies.count
        crops_available << crop
      end
    end
    
    #Return to ajax call.
    render json: { user_count: search.results.count, crops_available: crops_available }
  end
  
end
