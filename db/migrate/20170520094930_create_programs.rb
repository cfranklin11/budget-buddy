class CreatePrograms < ActiveRecord::Migration[5.1]
  def change
    create_table :programs do |t|
      t.string :description
      t.string :name
      t.belongs_to :department, index: true

      t.timestamps
    end
  end
end
