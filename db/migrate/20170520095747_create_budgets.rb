class CreateBudgets < ActiveRecord::Migration[5.1]
  def change
    create_table :budgets do |t|
      t.numeric :budget
      t.datetime :year
      t.belongs_to :program

      t.timestamps
    end
  end
end
