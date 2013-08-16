class User < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :first_name, :last_name, :email, :password
  has_secure_password
  has_one :geocode
  has_many :supplies
  has_many :demands
  validates_presence_of :first_name, :last_name, :email, :password
  
end
