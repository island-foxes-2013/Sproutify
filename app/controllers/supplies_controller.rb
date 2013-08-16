class SuppliesController < ApplicationController

  def create
  	# user = User.create(first_name: 'greg', last_name: 'varias', email: 'greg@me.com', password: 'greg')
  	crop = Crop.find_or_create_by_name(params[:crop_name])
  	staus = Status.create(name: params[:status])
  	supply = current_user.supplies.create(crop: crop, status: status)

  	puts '*' * 50
  	puts "In SUPPLIES#CREATE"
  	
  	# render json: { supply: supply }
  	redirect_to root_path
  end

end
