class SuppliesController < ApplicationController
	skip_before_filter :require_login

  def create
  	user = User.create(first_name: 'greg5', last_name: 'varias', email: 'greg@me.com', password: 'greg')
  	crop = Crop.find_or_create_by_name(params[:crop_name])
  	status = Status.create(name: params[:status])
  	supply = user.supplies.create(crop: crop, status: status)
  	render json: { supply: supply }
  end

end
