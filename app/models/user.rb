class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation
  has_secure_password
  has_one :geocode
  has_many :supplies
  has_many :demands
  validates_presence_of :first_name, :last_name, :email, :password, :password_confirmation
  validates_uniqueness_of :email
  
  after_validation { self.errors.messages.delete(:password_digest) }
end
