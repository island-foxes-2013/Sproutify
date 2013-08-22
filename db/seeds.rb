# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'

crops = ["Corn", "Cucumber", "Eggplant", "Muskmelon", "Pepper", "Tomatoe", "Watermelon", "Zucchini", "Cilantro", "Basil", "Mint", "Sage", "Blueberry", "Strawberry", "Lemon", "Lettuce", "Radish", "Chard", "Pea", "Kale", "Orange", ]

crops = crops.sort

crops.each do |crop|
  Crop.create(name: crop)
end

status = ["growing", "harvested", "dead"]

status.each do |status|
  Status.create(name: status)
end

min_lat = 37.789981
max_lat = 37.740313
min_lng = -122.479416
max_lng = -122.401825

25.times do
  user = User.create(first_name: Faker::Name.first_name,
              last_name:  Faker::Name.last_name,
              email: Faker::Internet.email,
              password: "password",
              password_confirmation: "password")
  lat = (max_lat - min_lat) * rand() + min_lat
  lng = (max_lng - min_lng) * rand() + min_lng
  user.create_geocode(lat: lat, lng: lng)
  status = Status.all.sample
  crop = Crop.all.sample
  user.supplies.create(crop: crop, status: status)
end

25.times do
  user = User.create(first_name: Faker::Name.first_name,
              last_name:  Faker::Name.last_name,
              email: Faker::Internet.email,
              password: "password",
              password_confirmation: "password")
  lat = (max_lat - min_lat) * rand() + min_lat
  lng = (max_lng - min_lng) * rand() + min_lng
  user.create_geocode(lat: lat, lng: lng)
  status = Status.all.sample
  crop = Crop.all.sample
  user.demands.create(crop: crop)
end

# Create test user

user = User.create(first_name: "Disco",
            last_name:  "Lumberjack",
            email: "test@example.com",
            password: "password",
            password_confirmation: "password")
lat = (max_lat - min_lat) * rand() + min_lat
lng = (max_lng - min_lng) * rand() + min_lng
user.create_geocode(lat: lat, lng: lng)

User.find(25).send_message(user, "I need some peppers like right now!", "Peppers")
