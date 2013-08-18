class SuppliesController < ApplicationController
	skip_before_filter :require_login

  respond_to :json

	def index
		user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
		growing = []
		harvested = []
		done = []

		user.supplies.all.each do |supply|
			crop = Crop.find_by_id(supply.crop_id)
			status = Status.find_by_id(supply.status_id)
			growing << crop.name if status.name == 'growing'
			harvested << crop.name if status.name == 'harvested'
			done << crop.name if status.name == 'done'
		end
		
		render json: { growing: growing, harvested: harvested, done: done }
	end

  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name])
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
