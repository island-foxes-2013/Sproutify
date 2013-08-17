class DemandsController < ApplicationController

  def index
    @user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
    @demands = @user.demands.all
  end

  def create
    crop = Crop.find_or_create_by_name(params[:crop_name])
    supply = current_user.demands.create(crop: crop)
  end

  def destroy
    Demand.find(params[:id]).destroy
  end

end
