class HomeController < ApplicationController

  def index
  end

  def fetch
    #Some code that gets lat,lng of the map and returns all results
    respond_to do |format|
      format.json { render :json => [{title: 'Dev Bootcamp', lat: 37.794152, lng: -122.406195}, {title: 'Tenderloin Playground', lat: 37.784893, lng: -122.415432}, {title: 'AT&T Park', lat: 37.778585, lng: -122.38934}] }
    end
  end
end
