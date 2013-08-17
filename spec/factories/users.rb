# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    first_name 	{Faker::Name.first_name}
    last_name 	{Faker::Name.last_name}
    email 			{Faker::Internet.email}
    password 		"meangreen"
    password_confirmation "meangreen"
  end

  factory :invalid_user, parent: :user do
    first_name 	nil
  end
end