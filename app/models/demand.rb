class Demand < ActiveRecord::Base
  attr_accessible :user, :crop
  belongs_to :user
  belongs_to :crop
  validates_presence_of :user, :crop
  validates_uniqueness_of :crop_id, scope: :user_id, message: "has already been requested"
end
