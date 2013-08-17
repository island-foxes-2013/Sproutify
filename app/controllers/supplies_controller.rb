class SuppliesController < ApplicationController
	skip_before_filter :require_login

	def index
		user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
		@supplies = user.supplies.all
		render json: {
		  supply_partial: render_to_string(partial:"shared/current_supply", locals: { current_supply: @supplies })
		}
	end


  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name])
  	status = Status.create(name: params[:status])
  	supply = current_user.supplies.create(crop: crop, status: status)

  	puts "*" * 50
  	render json: { supply: supply, crop: crop.name, status: status.name }
  end

  def show
  	@supply = Supply.find(params[:id])
  end

  def destroy
  	Supply.find(params[:id]).destroy
  end
end
