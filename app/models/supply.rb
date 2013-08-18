class Supply < ActiveRecord::Base
  attr_accessible :user, :crop, :status
  belongs_to :user
  belongs_to :crop
  belongs_to :status

  validates_presence_of :user, :crop
  # validates_presence_of :user, :crop, :status
  validates_uniqueness_of :user_id, scope: [:crop_id, :status_id]

  def available?
  end

  def count
  end
end
