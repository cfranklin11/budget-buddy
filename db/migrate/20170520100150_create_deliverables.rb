class CreateDeliverables < ActiveRecord::Migration[5.1]
  def change
    create_table :deliverables do |t|
      t.string :metric_type
      t.string :metric_unit
      t.string :name
      t.belongs_to :program

      t.timestamps
    end
  end
end
