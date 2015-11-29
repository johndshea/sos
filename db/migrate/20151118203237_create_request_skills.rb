class CreateRequestSkills < ActiveRecord::Migration
  def change
    create_table :request_skills do |t|
      t.integer :request_id
      t.integer :skill_id

      t.timestamps null: false
    end
  end
end
