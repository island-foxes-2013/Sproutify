class CreateSupplies < ActiveRecord::Migration
  def change
    create_table :supplies do |t|
      t.references :user
      t.references :crop
      t.references :status

      t.timestamps
    end
  end
end
