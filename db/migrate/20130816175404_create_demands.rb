class CreateDemands < ActiveRecord::Migration
  def change
    create_table :demands do |t|
      t.references :user
      t.references :crop

      t.timestamps
    end
  end
end
