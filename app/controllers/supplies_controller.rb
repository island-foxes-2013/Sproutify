class SuppliesController < ApplicationController
	skip_before_filter :require_login

	def index
		@supplies = User.find(params[:user_id]).supplies.all
	end


  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name])
  	supply = current_user.supplies.create(crop: crop)

  	# NOT USING 'STATUS' YET
  	# status = Status.create(name: params[:status])
  	# supply = current_user.supplies.create(crop: crop, status: status)
  	
  	# render json: { supply: supply }

  	redirect_to supply_path(supply)
  end

  def show
  	@supply = Supply.find(params[:id])
  end

  def destroy
  	# user = User.find(params[:user_id])
  	Supply.find(params[:id]).destroy
  end
end
