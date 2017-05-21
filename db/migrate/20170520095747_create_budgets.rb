class CreateBudgets < ActiveRecord::Migration[5.1]
  def change
    create_table :budgets do |t|
      t.float :budget
      t.integer :year
      t.belongs_to :program

      t.timestamps
    end
  end
end
