class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    @user = User.new if !logged_in?
    render partial: "shared/static", layout: "application"
    # render partial: "shared/landing", layout: "application"
  end

  def fetch
    #Uses Sunspot to search
    search = Geocode.search do
      with(:location).in_radius(params[:lat], params[:lng], 10)
    end
    # it "has a search radius of 10"
    # it "shuffles the results"
    # context "when there are no results"
    #   it "returns blablabla"
    # context "when there are multiple pages of results"
    # context ""
    crops_available = []
    crops_demanded = []

    search.results.shuffle.each do |result|
      user = result.user
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

  def find_users
    search = Geocode.search do
      with(:location).in_radius(params[:lat], params[:lng], 10)
    end

    local_users = []

    search.results.each do |result|
      hit = { user: result.user,
              lat:  result.lat,
              lng:  result.lng,
              supplies: result.user.supplies.map{|supply| supply.crop.name},
              demands: result.user.demands.map{|demand| demand.crop.name} }
      local_users << hit
    end

    respond_to do |format|
      format.json { render :json => local_users }
    end

  end
  
end
