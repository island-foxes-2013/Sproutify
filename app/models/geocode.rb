class Geocode < ActiveRecord::Base
  attr_accessible :lat, :lng
  belongs_to :user
  validates_presence_of :user, :lat, :lng

  searchable do
  
    double :lat
    double :lng
    latlon(:location) { Sunspot::Util::Coordinates.new(lat, lng) }

  end
end
