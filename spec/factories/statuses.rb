# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :status do
    name "growing"
  end
end

FactoryGirl.define do
  factory :harvesting do
    name "harvesting"
  end
end
