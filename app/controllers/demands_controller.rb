class DemandsController < ApplicationController
  respond_to :json

  def index
    user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
    demands = user.demanding
    render json: { demands: demands }
  end

  def create
    crop = Crop.find_or_create_by_name(params[:demand_crop_name])
    demand = current_user.demands.create(crop: crop)
    render json: { demand: demand }
  end

  def destroy
    Demand.find(params[:id]).destroy
  end
end
