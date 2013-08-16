class Status < ActiveRecord::Base
  attr_accessible :name
  has_many :supplies
  validates_presence_of :name
end
