class AddPaperclipFieldsToRequest < ActiveRecord::Migration
  def change
   add_column :requests, :image_file_name,    :string
   add_column :requests, :image_content_type, :string
   add_column :requests, :image_file_size,    :integer
   add_column :requests, :image_updated_at,   :datetime
  end
end
