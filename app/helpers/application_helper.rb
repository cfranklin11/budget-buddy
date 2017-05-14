module ApplicationHelper
  def departments
    file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    data = %x(python #{file_path})
    data
  end

  def department_data(department_name)
    file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    data = %x(python #{file_path} '#{department_name}')
    data
  end
end
