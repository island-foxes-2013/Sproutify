class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    if logged_in?
      render partial: "shared/main", layout: "application"
    else
      @user = User.new
      render partial: "shared/landing", layout: "application"
    end
  end

  def fetch
    #Some code that gets lat,lng of the map and returns all results
    # respond_to do |format|
    #   format.json { render :json => [{title: 'Dev Bootcamp', lat: 37.794152, lng: -122.406195}, {title: 'Tenderloin Playground', lat: 37.784893, lng: -122.415432}, {title: 'AT&T Park', lat: 37.778585, lng: -122.38934}] }
    # end

    search = Geocode.search do
      with(:location).in_radius(params[:lat], params[:lng], 10)
    end
    p '******************************************'
    ap search.results

    render json: { count: search.results.count }
  end
end
