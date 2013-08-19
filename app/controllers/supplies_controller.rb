class SuppliesController < ApplicationController
	skip_before_filter :require_login

  respond_to :json

	def index
		user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
		growing = user.growing
		harvested = user.harvesting
		render json: { growing: growing, harvested: harvested }
	end

  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name].downcase.pluralize)
  	status = Status.find_or_create_by_name(params[:status_name])
  	supply = current_user.supplies.create(crop: crop, status: status)
  	render json: { supply: supply, crop: crop.name, status: status.name }
  end

  def show
  	@supply = Supply.find(params[:id])
  end

  def destroy
  	Supply.find(params[:id]).destroy
  end
end
