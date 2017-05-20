class CreateMetrics < ActiveRecord::Migration[5.1]
  def change
    create_table :metrics do |t|
      t.numeric :metric
      t.datetime :year
      t.belongs_to :deliverable

      t.timestamps
    end
  end
end
