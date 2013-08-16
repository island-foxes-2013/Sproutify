class Geocode < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user, :lat, :lng
end
