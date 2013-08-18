class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation
  has_secure_password
  has_one :geocode
  has_many :supplies
  has_many :demands
  validates_presence_of :first_name, :last_name, :email, :password, :password_confirmation
  validates_uniqueness_of :email

  after_validation { self.errors.messages.delete(:password_digest) }

  def growing
  	status_id = Status.find_by_name('growing').id
  	growing_supplies = self.supplies.all.select {|x| x.status_id == status_id}
  	crop_names = []
  	growing_supplies.each do |supply|
  		crop_names << Crop.find_by_id(supply.crop_id)
  	end
  	crop_names
  end

  def harvesting
  	status_id = Status.find_by_name('harvested').id
  	harvested_supplies = self.supplies.all.select {|x| x.status_id == status_id}
  	crop_names = []
  	harvested_supplies.each do |supply|
  		crop_names << Crop.find_by_id(supply.crop_id)
  	end
  	crop_names
  end
end
