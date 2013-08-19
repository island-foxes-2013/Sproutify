class Geocode < ActiveRecord::Base
  attr_accessible :lat, :lng
  belongs_to :user
  validates_presence_of :user, :lat, :lng

  # sunspot search via :location
  searchable do
    double :lat
    double :lng
    latlon(:location) { Sunspot::Util::Coordinates.new(lat, lng) }
  end

  def self.find_local_users(lat, lng, radius)
    search = self.search do
      with(:location).in_radius(lat, lng, radius)
    end
    search.results.map{|result| result.user}
  end

  def self.boundary_search(upperLeft, lowerRight)
    search = self.search do
      with(:location).in_bounding_box([upperLeft[:lat], upperLeft[:lng]],
                                      [lowerRight[:lat], lowerRight[:lng]])
      paginate :page => 1, :per_page => 100
    end
    search.results.map{|result| result.user}
  end
end
