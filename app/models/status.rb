class Status < ActiveRecord::Base
  attr_accessible :name
  has_many :supplies
  validates_presence_of :name
  validates_uniqueness_of :name

  before_save :normalize

  private

  def normalize
    self.name = self.name.downcase
  end
end
