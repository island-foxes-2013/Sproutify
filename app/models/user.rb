class User < ActiveRecord::Base
  has_secure_password

  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation
  
  has_one :geocode
  has_many :supplies
  has_many :demands

  validates_presence_of :first_name, :last_name, :email, :password, :password_confirmation
  validates_uniqueness_of :email
  validates :email, format: {with: /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+\z/,
    message: "%{value} is not a properly formatted email address" }
  validates_length_of :password, :in => 6..20

  after_validation { self.errors.messages.delete(:password_digest) }
end
