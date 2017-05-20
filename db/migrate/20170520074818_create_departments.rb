class CreateDepartments < ActiveRecord::Migration[5.1]
  def change
    create_table :departments do |t|
      t.numeric :current_budget
      t.numeric :prev_budget
      t.string :name

      t.timestamps
    end
  end
end
