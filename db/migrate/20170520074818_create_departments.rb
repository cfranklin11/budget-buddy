class CreateDepartments < ActiveRecord::Migration[5.1]
  def change
    create_table :departments do |t|
      t.float :current_budget
      t.float :prev_budget
      t.string :name

      t.timestamps
    end
  end
end
