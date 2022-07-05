class AddMembersToTeams < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :members, :integer, array: true, default: []
  end
end
