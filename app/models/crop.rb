class Crop < ActiveRecord::Base
  attr_accessible :name
  validates_presence_of :name
  validates_uniqueness_of :name
  has_many :supplies
  has_many :demands

  def number_supplied(users)
    count = 0

    users.each do |user|
      user.supplies.each do |supply|
        count += 1 if supply.crop == self
      end
    end
    count
  end

  def number_demanded(users)
    count = 0

    users.each do |user|
      user.demands.each do |demand|
        count += 1 if demand.crop == self
      end
    end
    count
  end
end
