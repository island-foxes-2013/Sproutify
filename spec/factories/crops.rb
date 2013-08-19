# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :crop do
    name {Faker::Name.first_name}
  end
end
