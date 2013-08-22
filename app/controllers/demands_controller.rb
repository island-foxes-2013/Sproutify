class DemandsController < ApplicationController
  respond_to :json

  def index
    user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
    render json: { demands: user.demanding }
  end

  def create
    crop = Crop.find_or_create_by_name(params[:demand_crop_name].downcase.pluralize)
    if crop.valid?
      demand = current_user.demands.create(crop: crop)
      if demand.valid?
        render json: { demand: demand }
      else
        ap demand.errors.full_messages
        render json: { errors: demand.errors.full_messages }
      end
    else
      render json: { errors: crop.errors.full_messages }
    end
  end

  def destroy
    demand = Demand.find_by_id(params[:id])
    if demand
      demand.destroy
      render json: {success: true}
    else
      render json: {errors: ["Deletion error"]}
    end
  end
end
