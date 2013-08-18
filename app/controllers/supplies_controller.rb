class SuppliesController < ApplicationController
	skip_before_filter :require_login

  respond_to :json

	def index
		user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
		supply_sentences = []
		
		user.supplies.all.each do |supply|
			crop = Crop.find_by_id(supply.crop_id)
			status = Status.find_by_id(supply.status_id)
			supply_sentences << "#{crop.name}'s current status is #{status ? status.name : 'empty'}"
		end

		render json: { supplies: supply_sentences }
	end

  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name].first)
  	status = Status.create(name: params[:status].first)
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
