class SuppliesController < ApplicationController
	skip_before_filter :require_login

  respond_to :json

	def index
		user = !params[:user_id].nil? ? User.find_by_id(params[:user_id]) : current_user
		render json: { supplies: user.supplying }
	end

  def create
  	crop = Crop.find_or_create_by_name(params[:supply_crop_name].downcase.pluralize)
    if crop.valid?
      status = Status.find_or_create_by_name(params[:status_name])
      if status.valid?
        supply = current_user.supplies.create(crop: crop, status: status)
        if supply.valid?
          render json: { supply: supply, crop: crop.name, status: status.name }
        else
          render json: {errors: supply.errors.full_messages}
        end
      else
        render json: {errors: status.errors.full_messages}
      end
    else
      render json: {errors: crop.errors.full_messages}
    end
  end

  def show
  	@supply = Supply.find(params[:id])
  end

  def update
    supply = Supply.find(params[:id])
    if supply
      supply.status = Status.find_or_create_by_name(params[:status])
      supply.save
      if supply.valid?
        render json: {success: true}
      else
        render json: {errors: ["Duplicate supply error"]}
      end
    else
      render json: {errors: ["Update error"]}
    end
  end

  def destroy
    supply = Supply.find(params[:id])
    if supply
      supply.destroy
      render json: {success: true}
    else
      render json: {errors: ["Deletion error"]}
    end
  end

end
