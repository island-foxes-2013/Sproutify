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
    crops_demanded = []

    search.results.shuffle.each do |result|
      user = User.find_by_id(result[:user_id])
      supplies = user.supplies
      demands = user.demands

      if !supplies.empty?
        supplies.each do |supply|
          if supply.crop.supplies.count != 0
            crop = {}
            crop[:name] = supply.crop.name
            crop[:count] = supply.crop.supplies.count
            crops_available << crop
          end
        end
      end

      if !demands.empty?
        demands.each do |demand|
          if demand.crop.demands.count != 0
            crop = {}
            crop[:name] = demand.crop.name
            crop[:count] = demand.crop.demands.count
            crops_demanded << crop
          end
        end
      end
    end
    
    #Return to ajax call.
    render json: { user_count: search.results.count, crops_available: crops_available, crops_demanded: crops_demanded }
  end
  
end
