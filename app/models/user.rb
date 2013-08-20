class User < ActiveRecord::Base
  has_secure_password
  acts_as_messageable

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

  def growing
  	status_id = Status.find_or_create_by_name('growing').id
  	growing_supplies = self.supplies.select {|x| x.status_id == status_id}
    growing_supplies.map {|s| Crop.find_by_id(s.crop_id) }
  end

  def harvesting
  	status_id = Status.find_or_create_by_name('harvested').id
  	harvested_supplies = self.supplies.select {|x| x.status_id == status_id}
    harvested_supplies.map {|s| Crop.find_by_id(s.crop_id) }
  end

  def demanding
    self.demands.all.map {|x| Crop.find_by_id(x.crop_id)}
  end

  def name
    "#{self.first_name} #{self.last_name}"
  end

  def mailboxer_email(object)
    self.email
  end
end
