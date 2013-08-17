class SuppliesController < ApplicationController
	skip_before_filter :require_login

  def create
  	crop = Crop.find_or_create_by_name(params[:crop_name])
  	status = Status.create(name: params[:status])
  	supply = current_user.supplies.create(crop: crop, status: status)
  	# render json: { supply: supply }
  	redirect_to root_path
  end

end
