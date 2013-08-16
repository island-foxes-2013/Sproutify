class User < ActiveRecord::Base
  # attr_accessible :title, :body
  has_one :geocode
end
