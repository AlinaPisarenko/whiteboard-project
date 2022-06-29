class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :description
      t.string :whiteboard
      t.belongs_to :user
      t.belongs_to :team

      t.timestamps
    end
  end
end
