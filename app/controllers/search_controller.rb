class SearchController < ApplicationController
  def search
    upperLeft = {lat: params[:ulat], lng: params[:ulng]}
    lowerRight = {lat: params[:blat], lng: params[:blng]}
    users_in_boundary = Geocode.boundary_search(upperLeft, lowerRight)

    # TODO:ZS Consider using active_model_serializer or json_builder
    parsed_users = users_in_boundary.map do |user|
      hit = { user: user,
              lat:  user.geocode.lat,
              lng:  user.geocode.lng,
              supplies: user.supplies.map{|supply| supply.crop.name},
              demands: user.demands.map{|demand| demand.crop.name} }
    end

    respond_to do |format|
      format.json { render :json => parsed_users }
    end

  end
end
