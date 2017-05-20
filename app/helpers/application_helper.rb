# General helpers for getting data
module ApplicationHelper
  def departments_data
    file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    data = `python #{file_path}`
    data
  end

  def department_data(department_name)
    file_path = File.join(Rails.root, 'data/scripts', 'read_data.py')
    data = `python #{file_path} '#{department_name}'`
    JSON.parse(data)
  end
end
