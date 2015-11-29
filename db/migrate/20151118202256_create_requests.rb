class CreateRequests < ActiveRecord::Migration
  def change
    drop_table :requests
    create_table :requests do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.decimal :lat
      t.decimal :lng

      t.timestamps null: false
    end
  end
end
