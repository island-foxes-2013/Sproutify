# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'

min_lat = 37.789981
max_lat = 37.740313
min_lng = -122.479416
max_lng = -122.401825

50.times do
  user = User.create(first_name: Faker::Name.first_name,
              last_name:  Faker::Name.last_name,
              email: Faker::Internet.email,
              password: "test")
  lat = (max_lat - min_lat) * rand() + min_lat
  lng = (max_lng - min_lng) * rand() + min_lng
  user.create_geocode(lat: lat, lng: lng)
end

