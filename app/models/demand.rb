class Demand < ActiveRecord::Base
  attr_accessible :user, :crop
  belongs_to :user
  belongs_to :crop
  validates_presence_of :user, :crop
  validates_uniqueness_of :user_id, scope: :crop_id

end
