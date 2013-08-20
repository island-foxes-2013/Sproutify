class Supply < ActiveRecord::Base
  attr_accessible :user, :crop, :status
  belongs_to :user
  belongs_to :crop
  belongs_to :status

  validates_presence_of :user, :crop
  validates_uniqueness_of :crop_id, scope: [:user_id, :status_id], message: "has already een shared"
end
