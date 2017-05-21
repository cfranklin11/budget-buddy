# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170520100434) do

  create_table "budgets", force: :cascade do |t|
    t.float "budget"
    t.integer "year"
    t.integer "program_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["program_id"], name: "index_budgets_on_program_id"
  end

  create_table "deliverables", force: :cascade do |t|
    t.string "metric_type"
    t.string "metric_unit"
    t.string "name"
    t.integer "program_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["program_id"], name: "index_deliverables_on_program_id"
  end

  create_table "departments", force: :cascade do |t|
    t.float "current_budget"
    t.float "prev_budget"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "metrics", force: :cascade do |t|
    t.float "metric"
    t.integer "year"
    t.integer "deliverable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deliverable_id"], name: "index_metrics_on_deliverable_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "description"
    t.string "name"
    t.integer "department_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_programs_on_department_id"
  end

end
