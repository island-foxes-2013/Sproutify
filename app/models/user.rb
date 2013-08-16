class User < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :first_name, :last_name, :email, :password
  has_secure_password
  has_one :geocode
end
