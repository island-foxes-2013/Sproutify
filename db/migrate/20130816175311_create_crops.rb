class CreateCrops < ActiveRecord::Migration
  def change
    create_table :crops do |t|
      t.string :name

      t.timestamps
    end
  end
end
