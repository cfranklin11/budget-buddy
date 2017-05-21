# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

name_file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
data_file_path = File.join(Rails.root, 'data/scripts', 'read_data.py')
dept_names = `python #{name_file_path}`

JSON.parse(dept_names).each do |department_name|
  data = `python #{data_file_path} '#{department_name}'`
  data_object = JSON.parse(data)

  department_model = Department.new(name: data_object['name'],
    current_budget: data_object['current_budget'],
    prev_budget: data_object['prev_budget'])

  data_object['programs'].each do |program|
    program_model = department_model.programs.new(description: program['description'], name: program['name'])

    program['budgets'].each do |budget|
      program_model.budgets.new(budget)
    end

    program['deliverables'].each do |deliverable|
      deliverable_model = program_model.deliverables.new(metric_type: deliverable['metric_type'],
        metric_unit: deliverable['metric_unit'],
        name: deliverable['name'])

      deliverable['metrics'].each do |metric|
        deliverable_model.metrics.new(metric)
      end
    end
  end

  department_model.save
end
