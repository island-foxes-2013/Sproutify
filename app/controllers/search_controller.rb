class SearchController < ApplicationController
  def search
    northEast = {lat: params[:NElat], lng: params[:NElng]}
    southWest = {lat: params[:SWlat], lng: params[:SWlng]}
    users_in_boundary = Geocode.boundary_search(southWest, northEast)

    # TODO:ZS Consider using active_model_serializer or json_builder
    parsed_users = users_in_boundary.map do |user|
      hit = { user: user,
              lat:  user.geocode.lat,
              lng:  user.geocode.lng,

              supplies: user.supplies.map do |supply|
                {name: supply.crop.name, status: supply.status.name}
              end,
              demands: user.demands.map do |demand|
                {name: demand.crop.name}
              end
            }
    end

    respond_to do |format|
      format.json { render :json => parsed_users }
    end
  end
end
