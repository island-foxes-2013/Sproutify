class CreateGeocodes < ActiveRecord::Migration
  def change
    create_table :geocodes do |g|
      g.references :user
      g.decimal :lat
      g.decimal :lng

      g.timestamps
    end
  end
end
